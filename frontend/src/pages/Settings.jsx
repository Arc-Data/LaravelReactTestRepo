import { faImage, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Datepicker from 'react-datepicker'
import { useContext, useEffect, useState } from "react"

import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../context/AuthContext";
import useUserManager from "../hooks/useUserManager";
import Spinner from "../components/Spinner";

const Settings = () => {
    const { user, authToken } = useContext(AuthContext)
    const { loading, getUser, editUser } = useUserManager(authToken)
    const [ profile, setProfile ] = useState({
        name: '',
        about: '',
        profile_image: '',
        banner: '',
        birthdate: null,
    })
    const [ imagePreviews, setImagePreviews ] = useState({
        profile_image_preview: '',
        banner_preview: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        await editUser(profile);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProfile(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const name = e.target.name

        const previewUrl = URL.createObjectURL(file)

        setImagePreviews(prev => ({
            ...prev,
            [`${name}_preview`]: previewUrl
        }))

        setProfile(prev => ({
            ...prev,
            [name]: file
        }))
    }

    useEffect(() => {
        const fetchUser = async () => {
            const tempUser = await getUser(user.username)
            setProfile(tempUser)

            setImagePreviews({
                profile_image_preview: tempUser.profile_image ? tempUser.profile_image : '',
                banner_preview: tempUser.banner ? tempUser.banner : '' 
            })
        }

        fetchUser()
    }, [])

    if (loading) return (<Spinner/>)
    

    return (
        <div className="mt-20 md:mt-10">
            <h1 className="mb-12 text-3xl font-bold">Settings</h1>
            <form 
                method="POST" 
                encType="multipart/form-data"
                className="flex flex-col max-w-2xl gap-16 text-slate-400" onSubmit={handleSubmit}>
                <p className="pb-2 border-b border-slate-800">Profile Information</p>
                <section className="flex flex-col gap-8">
                    <div>
                        <div className="mb-4">
                            <label htmlFor="name" className="text-white text-md">Username</label>
                            <p className="text-sm">Set user name</p>
                        </div>
                        <input type="text" name="name" 
                            className="w-full px-3 py-2 bg-transparent border rounded-lg border-slate-800"
                            onChange={handleInputChange}
                            value={profile.name}
                            placeholder="Username"/>
                    </div>
                    <div>
                        <div className="mb-4">
                            <label htmlFor="about" className="text-white text-md">About</label>
                            <p className="text-sm">Tell something about yourself. This will be shown in your profile</p>
                        </div>
                        <textarea name="about" rows={4}
                            className="w-full px-3 py-2 bg-transparent border rounded-lg border-slate-800"
                            onChange={handleInputChange}
                            value={profile.about}
                            placeholder="About"/>
                    </div>
                    <div>
                        <div className="mb-4">
                            <label htmlFor="birthdate" className="text-white text-md">Birth Date</label>
                            <p className="text-sm">Enter date of birth</p>
                        </div>
                        <Datepicker 
                            selected={profile.birthdate}
                            onChange={(date) => setProfile(prev => ({...prev, birthdate: date}))}
                            date_format="yyyy-MM-dd"
                            name="birthdate"
                            id="birthdate"
                            className="px-3 py-2 bg-transparent border rounded-lg border-slate-800"
                            />
                    </div>
                </section>
                <div className="pb-2 border-b border-slate-800">
                    <p className="mb-2">Display Information</p>
                </div>
                <section className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-white">Banner and Profile</p>
                        <p className="text-sm">Uploadable Formats: SVG, JPG, JPEG, PNG.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-2/3">
                            <label htmlFor="dropzone-banner" className="flex flex-col w-full border border-gray-300 border-dashed h-52">
                                <div className="relative h-full">
                                    {imagePreviews.banner_preview && (
                                        <img
                                            src={imagePreviews.banner_preview}
                                            alt="Banner Preview"
                                            className="absolute inset-0 object-cover w-full h-full"
                                        />
                                    )}
                                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full text-white bg-black bg-opacity-60">
                                        <FontAwesomeIcon icon={faImage} className="mb-4 text-4xl"/>
                                        <p className="mb-2 text-sm">Click or drop files to upload banner</p>
                                    </div>
                                </div>
                                <input type="file" className="hidden" id="dropzone-banner" name="banner" onChange={handleImageChange}/>
                            </label>
                        </div>
                        <div className="w-1/3 align-bottom">
                            <label htmlFor="dropzone-profile" className="flex flex-col w-full border border-gray-300 border-dashed h-52">
                                <div className="relative h-full">
                                    {imagePreviews.profile_image_preview && (
                                        <img
                                            src={imagePreviews.profile_image_preview}
                                            alt="Banner Preview"
                                            className="absolute inset-0 object-cover w-full h-full"
                                        />
                                    )}
                                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full text-white bg-black bg-opacity-60">
                                        <FontAwesomeIcon icon={faImage} className="mb-4 text-4xl"/>
                                        <p className="mb-2 text-sm">Click or drop files to upload banner</p>
                                    </div>
                                </div>
                                <input type="file" className="hidden" id="dropzone-profile" name="profile_image" onChange={handleImageChange}/>
                            </label>
                        </div>
                    </div>
                </section>
                <section className="text-right">
                    <button className="px-6 py-2 text-white bg-blue-500 rounded">Save Changes</button>
                </section>
                
            </form>
        </div>
    )
}

export default Settings;