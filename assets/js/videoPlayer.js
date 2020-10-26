const videoContainer = document.getElementById('videoDetailContainer');
const video = document.getElementById('videoInDetail');

const registerView = () => {
	const videoId = window.location.href.split('/videos/')[1];
	fetch(`/api/${videoId}/view/plus`, { method: 'POST' });
};

const main = () => {
	video.volume = 0.3;
	video.addEventListener('ended', registerView);
};

if (videoContainer) {
	main();
}
