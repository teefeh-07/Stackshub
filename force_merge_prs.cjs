const { execSync } = require('child_process');

function run(command) {
    try {
        const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
        return output;
    } catch (e) {
        return null; // Suppress errors intentionally since we are fast-failing
    }
}

async function forceMerge() {
    console.log("Fetching open PRs...");
    const out = run('gh pr list --state open --limit 200 --json number');
    if (!out) {
        console.error("Failed to fetch PRs.");
        return;
    }

    const prs = JSON.parse(out);
    console.log(`Found ${prs.length} open PRs.`);

    for (const pr of prs) {
        console.log(`\n============================`);
        console.log(`Forcing merge for PR #${pr.number}`);
        console.log(`============================`);

        try {
            // Check out main and update
            run('git merge --abort');
            run('git reset --hard');
            run('git checkout main');
            run('git pull origin main --rebase');

            // Checkout PR branch
            const co = run(`gh pr checkout ${pr.number}`);
            if (!co && !run('git branch --show-current').includes('feat') && !run('git branch --show-current').includes('test')) {
                console.log(`Failed to checkout PR #${pr.number}, skipping.`);
                continue;
            }

            // At this point we are on PR branch. Merge main into this branch and keep 'ours'
            console.log("Merging main into PR branch (strategy: ours)...");
            // If there's a file collision, --strategy-option=ours will keep PR's changes
            run('git merge main --strategy-option=ours -m "Merge main into PR branch"');

            // Even with strategy ours, if a file doesn't exist anymore in main or something else wacky happens,
            // we might end up with unmerged files anyway. So let's force resolve any remaining conflicts.
            run('git checkout --ours .');
            run('git add .');
            run('git commit --allow-empty -m "fix conflicts local"');

            console.log("Pushing resolved branch to origin...");
            run('git push origin HEAD --force');

            console.log(`Merging PR #${pr.number}...`);
            const mergeResult = run(`gh pr merge ${pr.number} --merge --admin`);

            if (mergeResult) {
                console.log(`[SUCCESS] Merged PR #${pr.number}`);
            } else {
                console.log(`[FAILED] Could not merge PR #${pr.number} via gh cli.`);
            }
        } catch (err) {
            console.error(`Error processing PR #${pr.number}`);
        }
    }

    console.log("\nDone processing open PRs.");
}

forceMerge();
