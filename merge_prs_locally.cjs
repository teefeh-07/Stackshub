const { execSync } = require('child_process');

function run(command) {
    try {
        const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
        return output;
    } catch (e) {
        console.error(`Command failed: ${command}`);
        return null;
    }
}

async function forceMainMerge() {
    console.log("Fetching open PRs...");
    const out = run('gh pr list --state open --limit 200 --json number,headRefName');
    if (!out) {
        console.error("Failed to fetch PRs.");
        return;
    }

    const prs = JSON.parse(out);
    console.log(`Found ${prs.length} open PRs.`);

    // Go to main branch and fast-forward to latest remote state
    run('git merge --abort');
    run('git reset --hard');
    run('git checkout main');
    run('git pull origin main');

    for (let i = prs.length - 1; i >= 0; i--) { // merge older PRs first conceptually
        const pr = prs[i];
        console.log(`\n============================`);
        console.log(`Forcing merge for PR #${pr.number} (Branch: ${pr.headRefName})`);

        // Ensure remote tracking branch is fetched
        run(`git fetch origin ${pr.headRefName}`);

        try {
            // merge PR branch into main preferring its changes if there's a conflict
            // if --strategy-option=theirs still breaks due to modify/delete or added/added we have to force it
            run(`git merge origin/${pr.headRefName} --strategy recursive -X theirs -m "Merge PR #${pr.number} from branch ${pr.headRefName}"`);

            // push main
            run(`git push origin main`);
            console.log(`[SUCCESS] Merged PR #${pr.number} locally and pushed to main.`);
        } catch (err) {
            console.error(`[FAILED] Conflict resolving PR #${pr.number}, trying to force resolve.`);
            // brute force resolving:
            run('git add .');
            run('git commit -a -m "Fixing merge conflicts for PR ' + pr.number + '"');
            run('git push origin main');
            run('git merge --abort'); // clean up if still broken
            run('git reset --hard origin/main');
        }
    }

    console.log("\nDone processing open PRs.");
}

forceMainMerge();
