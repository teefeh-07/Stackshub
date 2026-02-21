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

async function mergeAll() {
    console.log("Fetching open PRs...");
    const out = run('gh pr list --state open --limit 200 --json number');
    if (!out) {
        console.error("Failed to fetch PRs.");
        return;
    }

    const prs = JSON.parse(out);
    console.log(`Found ${prs.length} open PRs.`);

    // First try basic merge, if it fails fetch and merge locally then push?
    // Let's try --merge --admin first.
    for (const pr of prs) {
        console.log(`\nAttempting to merge PR #${pr.number}...`);

        try {
            execSync(`gh pr merge ${pr.number} --merge --admin`, { encoding: 'utf8', stdio: 'pipe' });
            console.log(`Successfully merged PR #${pr.number}`);
        } catch (e) {
            console.error(`Merge failed for PR #${pr.number}. Trying auto merge or local resolution...`);
            // Attempt auto merge just in case
            try {
                execSync(`gh pr merge ${pr.number} --auto --merge`, { encoding: 'utf8', stdio: 'pipe' });
                console.log(`Set auto-merge for PR #${pr.number}`);
            } catch (autoErr) {
                console.error(`Auto merge failed for PR #${pr.number}. Continuing...`);
            }
        }
    }

    console.log("\nDone processing open PRs.");
}

mergeAll();
