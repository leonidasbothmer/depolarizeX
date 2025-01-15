let tweets = [];
let authors = [];

// Function to fetch JSON data
async function fetchJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Fetched data from ${url}:`, data); // Debugging log
        return data;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return null;
    }
}

// Function to load data
async function loadData() {
    tweets = await fetchJsonData('static/data/tweets.json');
    authors = await fetchJsonData('static/data/authors.json');

    if (tweets && authors) {
        // console.log('Tweets:', tweets);
        // console.log('Authors:', authors);

        // Create posts after data is loaded
        for (let i = 0; i < tweets.length; i++) {
            const post = createPost(i);
            // console.log(post)
            if (post) {
                const feed = document.getElementById('feed');
                feed.appendChild(post);
            }
        }
        
        // Dispatch custom event when posts are loaded
        document.dispatchEvent(new Event('postsLoaded'));
    } else {
        console.error('Failed to load tweets or authors data');
    }
}

// Function to create a post element
function createPost(tweet_index) {
    const tweet = tweets[tweet_index];
    if (!tweet) {
        console.error(`Tweet at index ${tweet_index} is undefined`);
        return null;
    }
    const author = authors[tweets[tweet_index].tweet.author_id];
    if (!author) {
        console.error(`Author with ID ${tweet.author_id} is undefined`);
        return null;
    }

    const postText = tweets[tweet_index].tweet.text;
    const imageUrl = tweets[tweet_index].tweet.image_url;
    const name = author.name;
    const handle = author.handle;
    const profileImageUrl = author.profile_image_url;

    const post = document.createElement('article');
    post.className = 'post';

    const profileImgHold = document.createElement('div');
    profileImgHold.className = 'profile-img-hold';
    
    const profileImg = document.createElement('img');
    profileImg.className = 'profile-img';
    profileImg.src = profileImageUrl;
    profileImg.alt = `${name}'s profile picture`;

    profileImgHold.appendChild(profileImg);

    const postInformation = document.createElement('div');
    postInformation.className = 'post-information';

    const postProfileInfo = document.createElement('div');
    postProfileInfo.className = 'post-profile-info';
    
    const postName = document.createElement('p');
    postName.className = 'post-name';
    postName.textContent = name;
   
    const premiumBadge = document.createElement('img');
    premiumBadge.src = 'static/assets/icons/premium-badge.svg';
    premiumBadge.alt = '';
    
    const postHandle = document.createElement('p');
    postHandle.className = 'post-handle';
    const timeUnits = ['s', 'm', 'h'];
    const randomUnit = timeUnits[Math.floor(Math.random() * timeUnits.length)];
    const randomNumber = Math.floor(Math.random() * 57) + 3;
    postHandle.textContent = `${handle} • ${randomNumber}${randomUnit}`;

    postProfileInfo.appendChild(postName);
    postProfileInfo.appendChild(premiumBadge);
    postProfileInfo.appendChild(postHandle);

    const postSettings = document.createElement('div');
    postSettings.className = 'post-settings';
    
    const settingsIcon = document.createElement('img');
    settingsIcon.src = 'static/assets/icons/ellipse-placeholder.svg';
    settingsIcon.alt = '';

    postSettings.appendChild(settingsIcon);

    postInformation.appendChild(postProfileInfo);
    postInformation.appendChild(postSettings);

    const postTextElement = document.createElement('p');
    postTextElement.className = 'post-text';

    // Highlight hashtags in the post text
    const highlightedPostText = postText.replace(/(#\w+)/g, '<span class="accent-color">$1</span>');
    
    // Make the text appear in the UI
    postTextElement.innerHTML = highlightedPostText;

    const postContent = document.createElement('div');
    postContent.className = 'post-content';
    postContent.appendChild(postTextElement);

    if (imageUrl) {
        const postImage = document.createElement('img');
        postImage.className = 'post-image';
        postImage.src = imageUrl;
        postImage.alt = 'Post image';
        postContent.appendChild(postImage);
    }

    // Interactions
    const postInteractions = document.createElement('div');
    postInteractions.className = 'post-interactions';
    // Comment icon
    const commentHold = document.createElement('a');
    // commentHold.className = 'comment-icon';
    const commentIcon = document.createElement('img');
    commentIcon.className = 'comment-icon';
    commentIcon.src = 'static/assets/icons/comment-blank.svg';
    commentIcon.alt = 'comment icon';
    commentHold.appendChild(commentIcon);
    postInteractions.appendChild(commentHold);
    // Retweet icon
    const retweetHold = document.createElement('div');
    // retweetHold.className = 'retweet-icon';
    const retweetIcon = document.createElement('img');
    retweetIcon.className = 'retweet-icon';
    retweetIcon.src = 'static/assets/icons/retweet-blank.svg';
    retweetIcon.alt = 'retweet icon';
    retweetHold.appendChild(retweetIcon);
    postInteractions.appendChild(retweetHold);
    // Heart icon
    const heartHold = document.createElement('div');
    // heartHold.className = 'heart-icon';
    const heartIcon = document.createElement('img');
    heartIcon.className = 'heart-icon';
    heartIcon.src = 'static/assets/icons/heart-blank.svg';
    heartIcon.alt = 'heart icon';
    heartHold.appendChild(heartIcon);
    postInteractions.appendChild(heartHold);
    // Bookmark icon
    const bookmarkHold = document.createElement('div');
    // bookmarkHold.className = 'bookmark-icon';
    const bookmarkIcon = document.createElement('img');
    bookmarkIcon.className = 'bookmark-icon';
    bookmarkIcon.src = 'static/assets/icons/bookmark-blank.svg';
    bookmarkIcon.alt = 'bookmark icon';
    bookmarkHold.appendChild(bookmarkIcon);
    postInteractions.appendChild(bookmarkHold);
    // Impressions icon
    const impressionsHold = document.createElement('div');
    // impressionsHold.className = 'impressions-icon';
    const impressionsIcon = document.createElement('img');
    impressionsIcon.className = 'impressions-icon';
    impressionsIcon.src = 'static/assets/icons/impressions-blank.svg';
    impressionsIcon.alt = 'impressions icon';
    impressionsHold.appendChild(impressionsIcon);
    postInteractions.appendChild(impressionsHold);
    // Share icon
    const shareHold = document.createElement('div');
    // shareHold.className = 'share-icon';
    const shareIcon = document.createElement('img');
    shareIcon.className = 'share-icon';
    shareIcon.src = 'static/assets/icons/share-blank.svg';
    shareIcon.alt = 'share icon';
    shareHold.appendChild(shareIcon);
    postInteractions.appendChild(shareHold);

    // Create post content element and attach all the children
    const postHold = document.createElement('div');
    postHold.className = 'post-hold';
    postHold.appendChild(postInformation);
    postHold.appendChild(postContent);
    postHold.appendChild(postInteractions);

    // Attach post conetnt and image to the post element
    post.appendChild(profileImgHold);
    post.appendChild(postHold);

    return post;
}

// Initialize the feed when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadData);
// loadData();