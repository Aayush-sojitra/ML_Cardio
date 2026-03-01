export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const classNames = (...classes) => classes.filter(Boolean).join(' ');
