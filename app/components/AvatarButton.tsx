
import React, { Fragment, useEffect } from 'react';
import { fetchUser } from '~/auth-server';
import { useUserEmail } from '~/utils/context';

interface MyComponentProps {

}

const getUser = async () => {
    const user = await fetchUser()

    return user?.email

}

const AvatarButton: React.FC<MyComponentProps> = () => {

    const { state, dispatch } = useUserEmail();

    useEffect(() => {
        if (state.email === null) {
            console.log("This ran")
            const userEmail = getUser()

            userEmail.then((res) => {
                dispatch({ type: 'SET_EMAIL', payload: res })

            })
        }
    }, [])

    console.log("Show the State on button? ", state?.email)

    return (
        <Fragment>
            {state?.email ? (
                <button id="dropdown-scrollable" type="button" className="dropdown-toggle flex items-center" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                    <div className="avatar">
                        <div className="size-9.5 rounded-full">
                            <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar 1" />
                        </div>
                    </div>
                    {/* <button className="btn btn-accent">Menu</button> */}
                </button>
            ) : (
                <button className="btn btn-accent">Login/Signup</button>
            )}
        </Fragment>
    )
};

export default AvatarButton;