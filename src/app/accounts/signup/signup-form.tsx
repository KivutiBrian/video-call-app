"use client"

import { startTransition, useActionState, useState, useEffect } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup';
import { signUp } from "@/app/lib/actions/auth.actions";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First Name is required').trim(),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last Name is required').trim(),
    email: Yup.string().email('Invalid email').required('Email is required').trim(),
    password: Yup.string().min(8, 'Too Short!').required('Password is required')
})

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);

    const [state, formAction, pending] = useActionState(signUp, {
        success: false,
        message: '',
        errors: {}
    })

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

            <Formik initialValues={initialValues} validationSchema={SignUpSchema} onSubmit={async (values: FormData, { setSubmitting, setErrors, resetForm }) => {

                setSubmitting(true);
                setErrors({}); // Clear previous Formik errors before submission

                const formData = new FormData()
                formData.append('firstname', values.firstName)
                formData.append('lastname', values.lastName)
                formData.append('email', values.email)
                formData.append('password', values.password)

                // Invoke the server action
                startTransition(async () => {
                    const result = await formAction(formData)
                })


            }}>
                {({ isSubmitting, errors, touched, setErrors, resetForm, setSubmitting, isValid, dirty }) => {
                    // Effect to handle server-side errors and success messages
                    // This useEffect now needs access to `setErrors` and `resetForm` from the render prop
                    useEffect(() => {
                        if (state.errors) {
                            // Merge server-side errors into Formik's error state
                            setErrors(state.errors);
                        }
                        if (state.success) {
                            alert(state.message); // Or display a toast notification
                            resetForm(); // Clear the form on successful submission
                        }
                        // Always set submitting to false after action completes
                        // This ensures the button is re-enabled regardless of outcome.
                        setSubmitting(false);
                    }, [state, setErrors, resetForm, setSubmitting]); // Dependencies for useEffect
                    return (
                        <Form className="space-y-4">
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700">First Name</label>
                                <Field
                                    name="firstName"
                                    id="firstName"
                                    type="text"
                                    className={`mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:ring ${errors.firstName && touched.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[#38b000] focus:border-[#38b000] focus:ring-[#38b000]'} `}
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="mt-1 text-sm text-red-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700">Last Name</label>
                                <Field
                                    name="lastName"
                                    id="lastName"
                                    type="text"
                                    className={`mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:ring ${errors.lastName && touched.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[#38b000] focus:border-[#38b000] focus:ring-[#38b000]'} `}
                                />
                                <ErrorMessage
                                    name="lastName"
                                    component="div"
                                    className="mt-1 text-sm text-red-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="" className="block text-sm font-medium text-gray-700">Email</label>
                                <Field
                                    name="email"
                                    id="email"
                                    type="text"
                                    className={`mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:ring ${errors.email && touched.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[#38b000] focus:border-[#38b000] focus:ring-[#38b000]'} `}

                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="mt-1 text-sm text-red-500"
                                />
                            </div>
                            <div className="relative mt-1">
                                <label htmlFor="" className="block text-sm font-medium text-gray-700">Password</label>
                                <Field type={showPassword ? 'text' : 'password'} name="password" id="password" className={`mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${errors.password && touched.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[#38b000] focus:border-[#38b000] focus:ring-[#38b000]'}`} />
                                <button onClick={() => setShowPassword(!showPassword)} type="button" className="absolute inset-y-0 right-0 pr-3 top-3 flex items-center">{showPassword ? <EyeOff /> : <Eye />}</button>
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="mt-1 text-sm text-red-500"
                                />
                            </div>
                            <div>
                                <button disabled={!isValid || !dirty || pending} type="submit" className={`w-full bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isValid || !dirty || pending ? 'opacity-50 cursor-not-allowed' : ''}`}>{pending ? 'processing...' : 'Create Account'}</button>
                            </div>
                        </Form>
                    )
                }

                }
            </Formik>

        </div>
    )
}