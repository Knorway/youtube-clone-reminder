const previewContainer = document.getElementById('previewContainer');
const videoPreview = document.getElementById('videoPreview');
const recordBtn = document.getElementById('recordButton');

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
	const { data } = event;
	const link = document.createElement('a');
	link.href = URL.createObjectURL(data);
	link.download = `${Date.now()}.webm`;
	document.body.appendChild(link);
	link.click();
};

// turns off the camera
const stopVideoStream = (video) => {
	const stream = video.srcObject;
	const tracks = stream.getTracks();
	tracks.forEach((track) => {
		track.stop();
	});
	video.srcObject = null;
};

const stopRecording = () => {
	videoRecorder.stop();
	recordBtn.innerText = 'Start Recording';
	recordBtn.addEventListener('click', getPreview);
	recordBtn.removeEventListener('click', stopRecording);
	stopVideoStream(videoPreview);
};

const startRecording = () => {
	videoRecorder = new MediaRecorder(streamObject);
	videoRecorder.start();
	videoRecorder.addEventListener('dataavailable', handleVideoData);
	recordBtn.addEventListener('click', stopRecording);
	recordBtn.innerText = 'Stop Recording';
};

const getPreview = async () => {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
		});
		videoPreview.srcObject = stream;
		videoPreview.muted = true;
		videoPreview.play();
		streamObject = stream;
		startRecording();
	} catch (error) {
		recordBtn.innerText = 'failed to start recording';
	} finally {
		recordBtn.removeEventListener('click', getPreview);
	}
};

const main = () => {
	recordBtn.addEventListener('click', getPreview);
};

if (previewContainer) {
	main();
}
