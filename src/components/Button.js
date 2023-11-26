import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { IoSync } from "react-icons/io5";

const Button = ({
	children,
	primary,
	secondary,
	success,
	warning,
	danger,
	outline,
	rounded,
	loading,
	className,
	...rest
}) => {
	const classes = classnames(
		className,
		'flex items-center px-3 py-1.5 border h-8',
		{
			'opacity-80': loading,
			'bg-blue-500 text-white border-blue-500': primary,
			'bg-gray-900 text-white border-gray-900': secondary,
			'bg-green-500 text-white border-green-500': success,
			'bg-yellow-400 text-white border-yellow-400': warning,
			'bg-red-500 text-white border-red-500': danger,
			'bg-white': outline,
			'rounded-full': rounded,
			'text-blue-500': outline && primary,
			'text-gray-900': outline && secondary,
			'text-green-500': outline && success,
			'text-yellow-400': outline && warning,
			'text-red-500': outline && danger
		}
	);

	const mergedClasses = twMerge(`${classes}`);

	return (
		<button className={mergedClasses} disabled={loading} {...rest}>
			{loading ? <IoSync className="animate-spin" /> : children}
		</button>
	);
};

Button.propTypes = {	
	checkButtonVariation: ({ primary, secondary, success, warning, danger }) => {
		if (!!primary + !!secondary + !!success + !!warning + !!danger > 1) {
			throw new Error('Only one of primary, secondary, success, warning, danger can be true');
		};
	}
};

export default Button;