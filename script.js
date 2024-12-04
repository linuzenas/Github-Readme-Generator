document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // Technology Selection
    const techButtons = document.querySelectorAll('.tech-btn');
    const selectedTechs = new Set();
    const techSearch = document.getElementById('tech-search');

    techButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('selected');
            
            if (button.classList.contains('selected')) {
                selectedTechs.add(button.dataset.tech);
            } else {
                selectedTechs.delete(button.dataset.tech);
            }
        });
    });

    // Technology Search Functionality
    techSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        techButtons.forEach(button => {
            const techName = button.dataset.tech.toLowerCase();
            button.style.display = techName.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // Generate README Preview
    function generateReadmePreview() {
        // Collect Profile Information
        const profileTitle = document.getElementById('profile-title').value || 'Hi there! 👋';
        const profileSubtitle = document.getElementById('profile-subtitle').value || 'Software Developer';
        const profileAbout = document.getElementById('profile-about').value || 'Welcome to my GitHub profile!';

        // Collect Social Links
        const githubUrl = document.getElementById('github-url').value;
        const linkedinUrl = document.getElementById('linkedin-url').value;
        const twitterUrl = document.getElementById('twitter-url').value;
        const instagramUrl = document.getElementById('instagram-url').value;
        const websiteUrl = document.getElementById('website-url').value;

        // Generate Social Badges
        const socialBadges = [];
        if (githubUrl) socialBadges.push(`[![GitHub](https://img.shields.io/badge/GitHub-Profile-blue?logo=github)](${githubUrl})`);
        if (linkedinUrl) socialBadges.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin)](${linkedinUrl})`);
        if (twitterUrl) socialBadges.push(`[![Twitter](https://img.shields.io/badge/Twitter-Follow-blue?logo=twitter)](${twitterUrl})`);
        if (instagramUrl) socialBadges.push(`[![Instagram](https://img.shields.io/badge/Instagram-Follow-purple?logo=instagram)](${instagramUrl})`);
        if (websiteUrl) socialBadges.push(`[![Website](https://img.shields.io/badge/Personal-Website-green)](${websiteUrl})`);

        // Generate Technologies Section
        const techSection = selectedTechs.size > 0 
            ? `### 🛠️ Technologies & Tools\n\n${Array.from(selectedTechs)
                .map(tech => `![${tech}](https://img.shields.io/badge/-${tech}-informational?style=flat&logo=${tech}&logoColor=white)`)
                .join(' ')}`
            : '';

        // Construct README Template
        const readmeTemplate = `# ${profileTitle}

## ${profileSubtitle}

${socialBadges.length > 0 ? socialBadges.join(' ') : ''}

### 👤 About Me
${profileAbout}

${techSection ? '\n' + techSection : ''}

---

*Generated with GitHub README Generator* 🚀`;

        // Update Preview
        document.getElementById('readme-preview').textContent = readmeTemplate;
    }

    // Copy README to Clipboard
    document.getElementById('copy-readme').addEventListener('click', () => {
        const readmeText = document.getElementById('readme-preview').textContent;
        navigator.clipboard.writeText(readmeText).then(() => {
            alert('README copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });

    // Download README
    document.getElementById('download-readme').addEventListener('click', () => {
        const readmeText = document.getElementById('readme-preview').textContent;
        const blob = new Blob([readmeText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'README.md';
        link.click();
    });

    // Generate Preview on Input Change
    const inputElements = document.querySelectorAll('input, textarea');
    inputElements.forEach(input => {
        input.addEventListener('input', generateReadmePreview);
    });

    // Initial Preview Generation
    generateReadmePreview();
});