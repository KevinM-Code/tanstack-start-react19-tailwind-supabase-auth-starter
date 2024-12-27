

import React, { Fragment } from 'react';
import { useUserEmail } from '~/utils/context';

interface MyComponentProps {

}

const AvatarMenu: React.FC<MyComponentProps> = () => {

    const { state, dispatch } = useUserEmail();

    console.log("Show the State on menu? ", state?.email)

    return (
        <ul className="dropdown-menu dropdown-open:opacity-100 hidden min-w-52" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-avatar">
            {state?.email ? (
                <Fragment>
                    <li className="dropdown-header gap-3 border-0 pt-3">
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" href="#" alt="avatar 1" />
                            </div>
                        </div>
                        <div>
                            <h6 className="text-base-content/90 text-base font-semibold">
                                <span>{state?.email}</span>
                            </h6>
                        </div>
                    </li>
                    <li><hr className="border-base-content/25 -mx-2 mb-3" /></li>
                </Fragment>
            ) : null}
            {!state?.email ? (
                <Fragment>
                    <li>
                        <a className="dropdown-item" href="/login">
                            <span className="icon-[tabler--login]"></span>
                            Login
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="/signup">
                            <span className="icon-[tabler--login]"></span>
                            Signup
                        </a>
                    </li>
                </Fragment>
            ) : null}
            {state?.email ? (
                <Fragment>
                    <li>
                        <a className="dropdown-item" href="#">
                            <span className="icon-[tabler--settings]"></span>
                            Settings
                        </a>
                    </li>

                    <li>
                        <a className="dropdown-item" href="#">
                            <span className="icon-[tabler--receipt-rupee]"></span>
                            Billing
                        </a>
                    </li>
                </Fragment>
            ) : null}
            <li>
                <a className="dropdown-item" href="#">
                    <span className="icon-[tabler--help-triangle]"></span>
                    FAQs
                </a>
            </li>
            {state?.email ? (
                <Fragment>
                    <li><hr className="border-base-content/25 -mx-2 my-3" /></li>
                    <li>
                        <a className="dropdown-item" href="/logout">
                            <span className="icon-[tabler--logout]"></span>
                            Signout
                        </a>
                    </li>
                </Fragment>
            ) : null}
        </ul>
    );
};

export default AvatarMenu;