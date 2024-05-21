import { Formik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

const contactRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g;
const emailRegexp = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
const userSchema = Yup.object().shape({
	firstName: Yup.string().required("This field is required"),
	lastName: Yup.string().required("This field is required"),
	email: Yup.string().required("This field is required").matches(emailRegexp, "Invalid email"),
	contact: Yup.string()
		.matches(contactRegExp, "Invalid Contact Number")
		.required("This field is required"),
	address: Yup.string().required("This field is required")
});

const initialValues = {
	firstName: "",
	lastName: "",
	email: "",
	contact: "",
	address: "",
};
const Form = () => {
	const [id, setId] = useState(0);
	const [userData, setuserData] = useState(JSON.parse(localStorage.getItem("user-data")) || []);
	const contactRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g;
	const handleSubmit = (values, { resetForm }) => {
		setId((prev) => prev+1);
		setuserData(prev => [...prev, {
			id: id,
			...values
		}]);
		resetForm();
	};
	
	useEffect(()=>{
		localStorage.setItem("user-data", JSON.stringify(userData));
	},[userData]);
	return (
		<Box m="20px">
			<Header title="CREATE USER" subtitle="Create a new User Profile" />
			<Formik
				initialValues={initialValues}
				validationSchema={userSchema}
				onSubmit={handleSubmit}>
				{({
					values,
					errors,
					touched,
					handleBlur,
					handleChange,
					handleSubmit,
				}) => (
					<form onSubmit={handleSubmit}>
						<Box
							display="grid"
							gridTemplateColumns="repeat(4, minmax(0, 1fr))"
							gap="30px">
							<TextField
							id="fname"
								fullWidth
								variant="filled"
								label="First Name"
								value={values.firstName}
								onChange={handleChange}
								onBlur={handleBlur}
								type="text"
								name="firstName" error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2"}}
							/>
							<TextField
							id="lname"
								fullWidth
								variant="filled"
								label="Last Name"
								value={values.lastName}
								onChange={handleChange}
								onBlur={handleBlur}
								type="text"
								name="lastName"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: "span 2"}}
							/>
							<TextField
							id="eml"
								fullWidth
								variant="filled"
								label="Email"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								type="text"
								name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4"}}
							/>
							<TextField
							id="cct"
								fullWidth
								variant="filled"
								label="Contact"
								value={values.contact.replace(contactRegExp, '($1) $2-$3')}
								onChange={handleChange}
								onBlur={handleBlur}
								type="text"
								name="contact"
                                error={!!touched.contact && !!errors.contact}
                                helperText={touched.contact && errors.contact}
                                sx={{ gridColumn: "span 4"}}
							/>
							<TextField
							id="adss"
								fullWidth
								variant="filled"
								label="Address"
								value={values.address}
								onChange={handleChange}
								onBlur={handleBlur}
								type="text"
								name="address"
                                error={!!touched.address && !!errors.address}
                                helperText={touched.address && errors.address}
                                sx={{ gridColumn: "span 4"}}
							/>
						</Box>

						<Box display="flex" justifyContent="end" marginTop="20px">
							<Button variant="contained" type="submit" color="secondary">Create New User</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default Form;
