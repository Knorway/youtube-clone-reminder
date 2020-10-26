import axios from 'axios';
import { deleteHandler } from './deleteCommnets';

const commentInput = document.getElementById('commentInput');
const commentList = document.getElementById('comment-list');

const addHandler = (e) => {
	e.preventDefault();
	const videoId = window.location.href.split('/videos/')[1];
	let comment = e.target.querySelector('input').value;
	axios
		.post(`/api/${videoId}/comment/add`, { data: comment })
		.then((res) => {
			if (res.data.success) {
				const span = document.createElement('span');
				span.innerHTML = `
					<li>
						${comment}
						<i class="fas fa-trash delete-icon" data-src=${res.data.id}></i>
					</li>
				`;
				span.addEventListener('click', deleteHandler);
				commentList.prepend(span);
				e.target.querySelector('input').value = '';
			} else {
				const ok = window.confirm(res.data.error);
				ok ? (window.location = res.data.redirect) : null;
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
