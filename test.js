const container = (callback) => {
	return (arg) => {
		arg && callback(1, 2)(arg);
	};
};

const sum = (a, b) => (c) => {
	c ? console.log(a + b) : null;
};

container(sum)(true);
