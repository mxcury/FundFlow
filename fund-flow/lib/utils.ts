/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
	const dateTimeOptions: Intl.DateTimeFormatOptions = {
		weekday: "short", // abbreviated weekday name (e.g., 'Mon')
		month: "short", // abbreviated month name (e.g., 'Oct')
		day: "numeric", // numeric day of the month (e.g., '25')
		hour: "numeric", // numeric hour (e.g., '8')
		minute: "numeric", // numeric minute (e.g., '30')
		hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
	};

	const dateDayOptions: Intl.DateTimeFormatOptions = {
		weekday: "short", // abbreviated weekday name (e.g., 'Mon')
		year: "numeric", // numeric year (e.g., '2023')
		month: "2-digit", // abbreviated month name (e.g., 'Oct')
		day: "2-digit", // numeric day of the month (e.g., '25')
	};

	const dateOptions: Intl.DateTimeFormatOptions = {
		month: "short", // abbreviated month name (e.g., 'Oct')
		year: "numeric", // numeric year (e.g., '2023')
		day: "numeric", // numeric day of the month (e.g., '25')
	};

	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: "numeric", // numeric hour (e.g., '8')
		minute: "numeric", // numeric minute (e.g., '30')
		hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
	};

	const formattedDateTime: string = new Date(dateString).toLocaleString(
		"en-US",
		dateTimeOptions
	);

	const formattedDateDay: string = new Date(dateString).toLocaleString(
		"en-US",
		dateDayOptions
	);

	const formattedDate: string = new Date(dateString).toLocaleString(
		"en-US",
		dateOptions
	);

	const formattedTime: string = new Date(dateString).toLocaleString(
		"en-US",
		timeOptions
	);

	return {
		dateTime: formattedDateTime,
		dateDay: formattedDateDay,
		dateOnly: formattedDate,
		timeOnly: formattedTime,
	};
};

export function formatAmount(amount: number, currency: string = "GBP"): string {
	const formatter = new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: currency,
		minimumFractionDigits: 2,
	});

	return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
	return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
	params: string;
	key: string;
	value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
	const currentUrl = qs.parse(params);

	currentUrl[key] = value;

	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	);
}

export function getAccountTypeColors(type: AccountTypes) {
	switch (type) {
		case "depository":
			return {
				bg: "bg-blue-25",
				lightBg: "bg-blue-100",
				title: "text-blue-900",
				subText: "text-blue-700",
			};

		case "credit":
			return {
				bg: "bg-success-25",
				lightBg: "bg-success-100",
				title: "text-success-900",
				subText: "text-success-700",
			};

		default:
			return {
				bg: "bg-green-25",
				lightBg: "bg-green-100",
				title: "text-green-900",
				subText: "text-green-700",
			};
	}
}

export function countTransactionCategories(
	transactions: Transaction[]
): CategoryCount[] {
	const categoryCounts: { [category: string]: number } = {};
	let totalCount = 0;

	// Iterate over each transaction
	transactions &&
		transactions.forEach((transaction) => {
			// Extract the category from the transaction
			const category = transaction.category;

			// If the category exists in the categoryCounts object, increment its count
			if (categoryCounts.hasOwnProperty(category)) {
				categoryCounts[category]++;
			} else {
				// Otherwise, initialize the count to 1
				categoryCounts[category] = 1;
			}

			// Increment total count
			totalCount++;
		});

	// Convert the categoryCounts object to an array of objects
	const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
		(category) => ({
			name: category,
			count: categoryCounts[category],
			totalCount,
		})
	);

	// Sort the aggregatedCategories array by count in descending order
	aggregatedCategories.sort((a, b) => b.count - a.count);

	return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
	// Split the URL string by '/'
	const parts = url.split("/");

	// Extract the last part, which represents the customer ID
	const customerId = parts[parts.length - 1];

	return customerId;
}

export function encryptId(id: string) {
	return btoa(id);
}

export function decryptId(id: string) {
	return atob(id);
}

export const getTransactionStatus = (date: Date) => {
	const today = new Date();
	const twoDaysAgo = new Date(today);
	twoDaysAgo.setDate(today.getDate() - 2);

	return date > twoDaysAgo ? "Processing" : "Success";
};

export const authFormSchema = (type: string) =>
	z.object({
		// sign up
		firstName:
			type === "sign-in"
				? z.string().optional()
				: z.string().min(3, {
						message: "First name must be at least 3 characters long",
				  }),
		lastName:
			type === "sign-in"
				? z.string().optional()
				: z.string().min(3, {
						message: "Last name must be at least 3 characters long",
				  }),
		address:
			type === "sign-in"
				? z.string().optional()
				: z
						.string()
						.max(50, { message: "Address must be at most 50 characters long" }),
		postalCode:
			type === "sign-in"
				? z.string().optional()
				: z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i, {
						message: "Invalid UK postcode format",
				  }),
		city:
			type === "sign-in"
				? z.string().optional()
				: z.string().max(50, {
						message: "City name must be at most 50 characters long",
				  }),
		dateOfBirth:
			type === "sign-in"
				? z.string().optional()
				: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/, {
						message: "Invalid date format, must be dd-mm-yyyy",
				  }),
		nin:
			type === "sign-in"
				? z.string().optional()
				: z.string().regex(/^[A-CEGHJ-PR-TW-Z][A-CEGHJ-PR-TW-Z]\d{6}[A-D]?$/i, {
						message: "Invalid UK National Insurance number format",
				  }),
		// both
		email: z.string().email({ message: "Must be a valid email address" }),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" })
			.regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
				message:
					"Password must contain at least one uppercase letter, one number, and one symbol",
			}),
	});
