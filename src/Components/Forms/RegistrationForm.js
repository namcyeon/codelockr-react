import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { DataContext } from '../../App'
import { createUser } from '../../API/apiData'

export default function RegistrationForm() {
	const history = useHistory()
	const { setShowRegistration, showRegistration, BASE_URL, setLoggedIn } = useContext(DataContext)
	const [formSubmitted, setFormSubmitted] = useState(false)
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: ""
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		setFormSubmitted(true)
		const newUser = await createUser(e, BASE_URL, formData)
		if (newUser.token) {
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				username: "",
				password: "",
				confirmPassword: ""
			})
			setShowRegistration(false)
			history.push(`/user/${newUser.username}`)
			setLoggedIn({ state: true, username: newUser.username, token: newUser.token })
		} else {
			console.error(newUser)
			setFormSubmitted(false)
			alert("Error on form submission")
		}
		setFormSubmitted(false)

	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value })
	}

	if (!showRegistration) return null
	return (
		<div className="fixed z-30 top-0 right-0 left-0 bottom-0 flex justify-center items-center">
			<div className="absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-md"></div>
			<div className="bg-gray-100 z-40 absolute w-3/4 h-1/2 flex rounded-2xl">
				<div className="w-1/2 h-full">
					<h1 className="text-2xl text-black m-10">Create an account</h1>
					<p className="text-md text-gray-700 m-10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores laborum tempora, omnis quod, natus vero eius impedit quibusdam soluta doloribus sequi odio incidunt rem! Praesentium qui ipsa beatae quidem. Quas.</p>
				</div>
				<div className="w-3/4 h-full bg-gradient-to-br from-darkBlue to-black rounded-2xl">
					{!formSubmitted ?
						(
							<form className="h-full" onSubmit={handleSubmit}>
								<div className="font-thin tracking-wider text-sm text-gray-50 flex flex-col mr-10 items-center justify-evenly py-4 w-full h-full px-8">
									<label className="w-full">
										<input required onChange={handleChange} value={formData.firstName} className=" outline-none bg-transparent text-xl tracking-wider border-b-2 border-gray-50 w-full" id="firstName" type="text" autoComplete="first-name" />
									First Name
									</label>
									<label className="w-full">

										<input required onChange={handleChange} value={formData.lastName} className="outline-none bg-transparent text-xl tracking-wide border-b-2 border-gray-50 w-full" id="lastName" type="text" autoComplete="family-name" />
									Last Name
									</label>
									<label className="w-full">

										<input required onChange={handleChange} value={formData.email} className="outline-none bg-transparent text-xl tracking-wide border-b-2 border-gray-50 w-full" id="email" type="text" autoComplete="email" />
									Email Address
									</label>
									<label className="w-full">

										<input required onChange={handleChange} value={formData.username} className="outline-none bg-transparent text-xl tracking-wide border-b-2 border-gray-50 w-full" id="username" type="text" autoComplete="off" />
									Username
									</label>
									<label className="w-full">

										<input required onChange={handleChange} value={formData.password} className="outline-none bg-transparent text-xl tracking-wide border-b-2 border-gray-50 w-full" id="password" type="password" autoComplete="new-password" />
									Password
									</label>
									<label className={formData.password !== formData.confirmPassword ? "w-full underline font-bold" : "w-full"}>

										<input required onChange={handleChange} value={formData.confirmPassword} className="outline-none bg-transparent pt-2 text-xl tracking-wide border-b-2 border-gray-50 w-full" id="confirmPassword" type="password" autoComplete="password" />
									Confirm Password
									</label>
									<div className="w-full flex justify-start">
										<button className="mr-10 p-2 font-normal text-sm text-gray-900 bg-gray-50 tracking-wide transform transition-all rounded-lg" type="submit">Create Account</button>
										<button className="p-2 text-sm tracking-wide rounded-lg border border-transparent hover:border-gray-50" onClick={() => setShowRegistration(false)}>Cancel</button>
									</div>
								</div>
							</form>
						)
						:
						(
							<div className="w-full h-full flex justify-center items-center">
								<div>
									<h2 className="text-2xl">Creating Account...</h2>
								</div>
							</div>
						)
					}
				</div>

			</div>

		</div>
	)
}