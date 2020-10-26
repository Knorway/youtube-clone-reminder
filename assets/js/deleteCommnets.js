import axios from 'axios';

const deleteIcons = document.querySelectorAll('.delete-icon');
const commentList = document.getElementById('comment-list');

export const deleteHandler = async (e) => {
	const commentId = e.target.dataset.src;
	await axios.post(`/api/${commentId}/comment/delete`, {
		data: commentId,
	});
	commentList.removeChild(e.target.parentElement.parentElement);
};

const main = () => {
	deleteIcons.forEach((e) => e.addEventListener('click', deleteHandler));
};

if (deleteIcons) {
	main();
}
