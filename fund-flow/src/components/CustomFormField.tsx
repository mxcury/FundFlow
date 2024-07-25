import React, { useState } from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons from lucide-react

const formSchema = authFormSchema("sign-up");

interface CustomFormFieldProps {
	control: Control<z.infer<typeof formSchema>>;
	name: FieldPath<z.infer<typeof formSchema>>;
	label: string;
	placeholder: string;
}

const CustomFormField = ({
	control,
	name,
	label,
	placeholder,
}: CustomFormFieldProps) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<div className="form-item">
					<FormLabel className="form-label">{label}</FormLabel>
					<div className="flex w-full flex-col relative">
						<FormControl>
							<div className="relative w-full">
								<Input
									placeholder={placeholder}
									className="input-class"
									type={
										name === "password" && !isPasswordVisible
											? "password"
											: "text"
									}
									{...field}
								/>
								{name === "password" && (
									<span
										onClick={togglePasswordVisibility}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
									>
										{isPasswordVisible ? <EyeOff /> : <Eye />}
									</span>
								)}
							</div>
						</FormControl>
						<FormMessage className="form-message mt-2" />
					</div>
				</div>
			)}
		/>
	);
};

export default CustomFormField;
