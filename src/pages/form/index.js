import { Formik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const contactRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g;
const emailRegexp = /^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/;
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
	const handleSubmit = (values) => {
		console.log(values);
	};
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
							{/* sx={{"& > div": { gridColumn: isNonMobile ? undefined : "span 4"}}}> */}
							<TextField
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
								fullWidth
								variant="filled"
								label="Contact"
								value={values.contact}
								onChange={handleChange}
								onBlur={handleBlur}
								type="text"
								name="contact"
                                error={!!touched.contact && !!errors.contact}
                                helperText={touched.contact && errors.contact}
                                sx={{ gridColumn: "span 4"}}
							/>
							<TextField
								fullWidth
								variant="filled"
								label="Address 1"
								value={values.address1}
								onChange={handleChange}
								onBlur={handleBlur}
								type="text"
								name="address1"
                                error={!!touched.address1 && !!errors.address1}
                                helperText={touched.address1 && errors.address1}
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