document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const adminPanel = document.getElementById('adminPanel');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const overlay = document.getElementById('overlay');
    const confirmDialog = document.getElementById('confirmDialog');
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');

    const blogTab = document.getElementById('blogTab');
    const projectsTab = document.getElementById('projectsTab');
    const memesTab = document.getElementById('memesTab');
    const blogSection = document.getElementById('blogSection');
    const projectsSection = document.getElementById('projectsSection');
    const memesSection = document.getElementById('memesSection');

    const newPostTab = document.getElementById('newPostTab');
    const managePostsTab = document.getElementById('managePostsTab');
    const newPostContent = document.getElementById('newPostContent');
    const managePostsContent = document.getElementById('managePostsContent');

    const newProjectTab = document.getElementById('newProjectTab');
    const manageProjectsTab = document.getElementById('manageProjectsTab');
    const newProjectContent = document.getElementById('newProjectContent');
    const manageProjectsContent = document.getElementById('manageProjectsContent');

    const newMemeTab = document.getElementById('newMemeTab');
    const manageMemesTab = document.getElementById('manageMemesTab');
    const newMemeContent = document.getElementById('newMemeContent');
    const manageMemesContent = document.getElementById('manageMemesContent');

    const postButton = document.getElementById('postButton');
    const projectButton = document.getElementById('projectButton');
    const memeButton = document.getElementById('memeButton');

    const existingPosts = document.getElementById('existingPosts');
    const existingProjects = document.getElementById('existingProjects');
    const existingMemes = document.getElementById('existingMemes');

    let itemToDelete = {
        type: null,
        id: null
    };

    const memeImageInput = document.getElementById('memeImage');
    const memePreview = document.getElementById('memePreview');

    if (memeImageInput) {
        memeImageInput.addEventListener('input', function () {
            updateMemePreview(this.value);
        });
    }

    function updateMemePreview(imageUrl) {
        if (memePreview) {
            if (imageUrl) {
                memePreview.innerHTML = `<img src="${imageUrl}" alt="Preview" class="preview-image">`;
            } else {
                memePreview.innerHTML = '';
            }
        }
    }

    if (sessionStorage.getItem('blogAdminLoggedIn') === 'true') {
        loginForm.style.display = 'none';
        adminPanel.style.display = 'block';
        loadExistingPosts();
    }

    blogTab.addEventListener('click', function () {
        activateSection(blogTab, blogSection);
    });

    projectsTab.addEventListener('click', function () {
        activateSection(projectsTab, projectsSection);
        loadExistingProjects();
    });

    memesTab.addEventListener('click', function () {
        activateSection(memesTab, memesSection);
        loadExistingMemes();
    });

    function activateSection(tab, section) {
        blogTab.classList.remove('active');
        projectsTab.classList.remove('active');
        memesTab.classList.remove('active');

        blogSection.classList.remove('active');
        projectsSection.classList.remove('active');
        memesSection.classList.remove('active');

        tab.classList.add('active');
        section.classList.add('active');
    }

    newPostTab.addEventListener('click', function () {
        activateTab(newPostTab, newPostContent, [managePostsTab], [managePostsContent]);
    });

    managePostsTab.addEventListener('click', function () {
        activateTab(managePostsTab, managePostsContent, [newPostTab], [newPostContent]);
        loadExistingPosts();
    });

    newProjectTab.addEventListener('click', function () {
        activateTab(newProjectTab, newProjectContent, [manageProjectsTab], [manageProjectsContent]);
    });

    manageProjectsTab.addEventListener('click', function () {
        activateTab(manageProjectsTab, manageProjectsContent, [newProjectTab], [newProjectContent]);
        loadExistingProjects();
    });

    newMemeTab.addEventListener('click', function () {
        activateTab(newMemeTab, newMemeContent, [manageMemesTab], [manageMemesContent]);
    });

    manageMemesTab.addEventListener('click', function () {
        activateTab(manageMemesTab, manageMemesContent, [newMemeTab], [newMemeContent]);
        loadExistingMemes();
    });

    function activateTab(activeTab, activeContent, otherTabs, otherContents) {
        activeTab.classList.add('active');
        activeContent.classList.add('active');

        otherTabs.forEach(tab => tab.classList.remove('active'));
        otherContents.forEach(content => content.classList.remove('active'));
    }

    loginButton.addEventListener('click', function () {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === ADMIN_CONFIG.username && password === ADMIN_CONFIG.password) {
            loginForm.style.display = 'none';
            adminPanel.style.display = 'block';
            errorMessage.style.display = 'none';

            sessionStorage.setItem('blogAdminLoggedIn', 'true');

            loadExistingPosts();
        } else {
            errorMessage.style.display = 'block';
            setTimeout(function () {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    });

    logoutButton.addEventListener('click', function () {
        sessionStorage.removeItem('blogAdminLoggedIn');
        adminPanel.style.display = 'none';
        loginForm.style.display = 'block';
    });

    postButton.addEventListener('click', function () {
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;;

        if (title && content) {
            let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

            const newPost = {
                id: Date.now().toString(), 
                title: title,
                content: content,
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };

            blogPosts.unshift(newPost);

            localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

            showSuccessMessage('Blog post added successfully!');

            document.getElementById('postTitle').value = '';
            document.getElementById('postContent').value = '';
        } else {
            alert('Please fill in both title and content!');
        }
    });

    projectButton.addEventListener('click', function () {
        const title = document.getElementById('projectTitle').value;
        const status = document.getElementById('projectStatus').value;
        const content = document.getElementById('projectContent').value;
        const links = document.getElementById('projectLinks').value;

        if (title && content) {
            let projects = JSON.parse(localStorage.getItem('projects')) || [];

            const newProject = {
                id: Date.now().toString(),
                title: title,
                status: status,
                content: content,
                links: links,
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };

            projects.unshift(newProject);

            localStorage.setItem('projects', JSON.stringify(projects));

            showSuccessMessage('Project added successfully!');

            document.getElementById('projectTitle').value = '';
            document.getElementById('projectStatus').selectedIndex = 0;
            document.getElementById('projectContent').value = '';
            document.getElementById('projectLinks').value = '';
        } else {
            alert('Please fill in both title and description!');
        }
    });

    document.getElementById('memeImage').addEventListener('input', function () {
        const imageUrl = this.value;
        const preview = document.getElementById('memePreview');

        if (imageUrl) {
            preview.innerHTML = `<img src="${imageUrl}" alt="Preview" class="preview-image">`;
        } else {
            preview.innerHTML = '';
        }
    });

    memeButton.addEventListener('click', function () {
        const image = document.getElementById('memeImage').value;
        const caption = document.getElementById('memeCaption').value;

        if (image) {
            let memes = JSON.parse(localStorage.getItem('memes')) || [];

            const newMeme = {
                id: Date.now().toString(),
                image: image,
                caption: caption || '', 
                likes: 0,
                laughs: 0,
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };

            memes.unshift(newMeme);

            localStorage.setItem('memes', JSON.stringify(memes));

            showSuccessMessage('Meme added successfully!');

            document.getElementById('memeImage').value = '';
            document.getElementById('memeCaption').value = '';
            document.getElementById('memePreview').innerHTML = '';
        } else {
            alert('Please enter an image URL!');
        }
    });

    function loadExistingPosts() {
        const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

        if (blogPosts.length === 0) {
            existingPosts.innerHTML = '<p>No blog posts yet. Add some from the "Add New Post" tab!</p>';
            return;
        }

        let postsHTML = '';

        blogPosts.forEach(post => {
            postsHTML += `
                <div class="post-preview">
                    <div class="post-preview-title">${post.title}</div>
                    <div class="post-preview-date">Posted on: ${post.date}</div>
                    <div class="post-preview-controls">
                        <button class="delete-button" data-type="blog" data-id="${post.id}">Delete Post</button>
                    </div>
                </div>
            `;
        });

        existingPosts.innerHTML = postsHTML;

        document.querySelectorAll('.delete-button[data-type="blog"]').forEach(button => {
            button.addEventListener('click', function () {
                itemToDelete.type = 'blog';
                itemToDelete.id = this.getAttribute('data-id');
                showConfirmDialog('Do you really want to delete this blog post?');
            });
        });
    }

    function loadExistingProjects() {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];

        if (projects.length === 0) {
            existingProjects.innerHTML = '<p>No projects yet. Add some from the "Add New Project" tab!</p>';
            return;
        }

        let projectsHTML = '';

        projects.forEach(project => {
            projectsHTML += `
                <div class="post-preview">
                    <div class="post-preview-title">${project.title}</div>
                    <div class="post-preview-date">Status: ${project.status}</div>
                    <div class="post-preview-controls">
                        <button class="delete-button" data-type="project" data-id="${project.id}">Delete Project</button>
                    </div>
                </div>
            `;
        });

        existingProjects.innerHTML = projectsHTML;

        document.querySelectorAll('.delete-button[data-type="project"]').forEach(button => {
            button.addEventListener('click', function () {
                itemToDelete.type = 'project';
                itemToDelete.id = this.getAttribute('data-id');
                showConfirmDialog('Do you really want to delete this project?');
            });
        });
    }

    function loadExistingMemes() {
        const memes = JSON.parse(localStorage.getItem('memes')) || [];

        if (memes.length === 0) {
            existingMemes.innerHTML = '<p>No memes yet. Add some from the "Add New Meme" tab!</p>';
            return;
        }

        let memesHTML = '';

        memes.forEach(meme => {
            const captionPreview = meme.caption ?
                (meme.caption.length > 30 ? meme.caption.substring(0, 30) + '...' : meme.caption) :
                'No caption';

            memesHTML += `
                <div class="post-preview">
                    <div class="post-preview-title">
                        <img src="${meme.image}" alt="Meme thumbnail" style="max-height: 40px; max-width: 40px; margin-right: 10px; vertical-align: middle;">
                        ${captionPreview}
                    </div>
                    <div class="post-preview-date">Added on: ${meme.date}</div>
                    <div class="post-preview-controls">
                        <button class="delete-button" data-type="meme" data-id="${meme.id}">Delete Meme</button>
                    </div>
                </div>
            `;
        });

        existingMemes.innerHTML = memesHTML;

        document.querySelectorAll('.delete-button[data-type="meme"]').forEach(button => {
            button.addEventListener('click', function () {
                itemToDelete.type = 'meme';
                itemToDelete.id = this.getAttribute('data-id');
                showConfirmDialog('Do you really want to delete this meme?');
            });
        });
    }

    function showConfirmDialog(message) {
        document.querySelector('#confirmDialog p:first-of-type').textContent = message;
        overlay.style.display = 'block';
        confirmDialog.style.display = 'block';
    }

    confirmYes.addEventListener('click', function () {
        if (itemToDelete.type && itemToDelete.id) {
            deleteItem(itemToDelete.type, itemToDelete.id);
            closeConfirmDialog();
        }
    });

    confirmNo.addEventListener('click', function () {
        closeConfirmDialog();
    });

    function closeConfirmDialog() {
        overlay.style.display = 'none';
        confirmDialog.style.display = 'none';
        itemToDelete.type = null;
        itemToDelete.id = null;
    }

    function showSuccessMessage(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        setTimeout(function () {
            successMessage.style.display = 'none';
        }, 3000);
    }

    function deleteItem(type, id) {
        let storageKey, loadFunction, successMessage;

        switch (type) {
            case 'blog':
                storageKey = 'blogPosts';
                loadFunction = loadExistingPosts;
                successMessage = 'Blog post deleted successfully!';
                break;
            case 'project':
                storageKey = 'projects';
                loadFunction = loadExistingProjects;
                successMessage = 'Project deleted successfully!';
                break;
            case 'meme':
                storageKey = 'memes';
                loadFunction = loadExistingMemes;
                successMessage = 'Meme deleted successfully!';
                break;
            default:
                return;
        }

        let items = JSON.parse(localStorage.getItem(storageKey)) || [];

        items = items.filter(item => item.id !== id);

        localStorage.setItem(storageKey, JSON.stringify(items));

        showSuccessMessage(successMessage);

        loadFunction();
    }
});