import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const App = () => {
  const [success, setSuccess] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccess("Form submitted successfully!");
    console.log("Form submitting", data);
    reset(); // Clear the form inputs after submission
  };

  return (
    <div className='bg-zinc-700 text-white h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl bg-zinc-900 p-4 rounded'>React Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='w-80 mt-6'>
        {/* First Name Field */}
        <div className='my-4'>
          <label htmlFor="firstName" className='text-xl block mb-1'>First Name:</label>
          <input
            id="firstName"
            {...register("firstName", {
              required: 'First name is required',
              minLength: {
                value: 3,
                message: 'Minimum length should be greater than 3'
              },
              maxLength: {
                value: 15,
                message: 'Maximum length is 15 characters'
              },
            })}
            placeholder='Enter first name'
            className={`p-2 w-full rounded-sm text-zinc-800 border ${errors.firstName ? "border-red-500" : "border-green-500"}`}
          />
          {errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName.message}</p>}
        </div>

        {/* Last Name Field */}
        <div className='my-4'>
          <label htmlFor="lastName" className='text-xl block mb-1'>Last Name:</label>
          <input
            id="lastName"
            {...register("lastName", {
              required: 'Last name is required',
              minLength: {
                value: 3,
                message: 'Minimum length should be greater than 3'
              },
              maxLength: {
                value: 15,
                message: 'Maximum length is 15 characters'
              },
            })}
            placeholder='Enter last name'
            className={`p-2 w-full rounded-sm text-zinc-800 border ${errors.lastName ? "border-red-500" : "border-gray-400"}`}
          />
          {errors.lastName && <p className='text-red-500 text-sm'>{errors.lastName.message}</p>}
        </div>

        {/* Email Field */}
        <div className='my-4'>
          <label htmlFor="email" className='text-xl block mb-1'>Email:</label>
          <input
            id="email"
            {...register("email", {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Enter a valid email address'
              },
            })}
            placeholder='Enter email'
            className={`p-2 w-full rounded-sm text-zinc-800 border ${errors.email ? "border-red-500" : "border-gray-400"}`}
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
        </div>

        {/* Submit Button */}
        <div className='my-4'>
          <input
            type='submit'
            className={`bg-sky-600 text-white p-2 rounded-md w-full transition-colors ${isSubmitting ? "cursor-not-allowed" : 'cursor-pointer hover:bg-sky-700'}`}
            disabled={isSubmitting}
            value={isSubmitting ? 'Submitting...' : 'Submit'}
          />
        </div>
      </form>

      {success && <p className='text-green-500 text-lg font-semibold mt-4'>{success}</p>}
    </div>
  );
};

export default App;
