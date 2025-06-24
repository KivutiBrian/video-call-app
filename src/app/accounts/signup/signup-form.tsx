"use client"

import { startTransition, useActionState, useState } from "react";
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
        message: ''
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

            <Formik initialValues={initialValues} validationSchema={SignUpSchema} onSubmit={async (values: FormData) => {
                const formData = new FormData()
                formData.append('firstname', values.firstName)
                // formData.append('lastname', values.lastName)
                // formData.append('email', values.email)
                // formData.append('password', values.password)

                startTransition(async () => {
                    const result = await formAction(formData)
                    console.log(result)
                })
            }}>
                {({ errors, touched }) => (
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
                            <button disabled={pending} type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{pending ? 'processing...' : 'Create Account'}</button>
                        </div>
                    </Form>
                )}
            </Formik>

            {/* <form action={formAction} className="space-y-4">
                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" name="firstname" id="firstname" required className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 " />
                </div>
                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" name="lastname" id="lastname" required className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 " />
                </div>
                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" required className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 " />
                </div>
                <div className="relative mt-1">
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type={showPassword ? 'text' : 'password'} name="password" id="password" required className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 " />
                    <button onClick={() => setShowPassword(!showPassword)} type="button" className="absolute inset-y-0 right-0 pr-3 top-6 flex items-center">{showPassword ? <EyeOff /> : <Eye />}</button>
                </div>
                <div>
                    <button disabled={pending} type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{pending ? 'processing...' : 'Create Account'}</button>
                </div>
            </form> */}
        </div>
    )
}