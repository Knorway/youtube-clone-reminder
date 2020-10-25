import axios from 'axios';

const commentInput = document.getElementById('commentInput');
const commentList = document.getElementById('comment-list');

const addHandler = (e) => {
	e.preventDefault();
	const videoId = window.location.href.split('/videos/')[1];
	let comment = e.target.querySelector('input').value;
	axios
		.post(`/api/${videoId}/comment`, {
			data: comment,
		})
		.then((res) => {
			if (res.status === 200) {
				const span = document.createElement('span');
				span.innerHTML = `
			        <li>${comment}</li>
			    `;
				commentList.prepend(span);
				e.target.querySelector('input').value = '';
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

const main = () => {
	commentInput.addEventListener('submit', addHandler);
};

if (commentInput) {
	main();
}
