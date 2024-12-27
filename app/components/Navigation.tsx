import React, { Fragment } from 'react';
import { useUserEmail } from '~/utils/context';
import AvatarButton from './AvatarButton';
import AvatarMenu from './AvatarMenu';
import { Link } from '@tanstack/react-router';

interface MyComponentProps {

}

const Navigation: React.FC<MyComponentProps> = () => {

    const { state, dispatch } = useUserEmail();

    console.log("Show the State on button? ", state?.email)

    return (
        <Fragment>
            <Fragment>
           
                <nav className="navbar rounded-t-box gap-4">
                    <div className="navbar-start items-center">
                        <a className="link text-base-content/90 link-neutral text-xl font-semibold no-underline" href="#">
                            FlyonUI
                        </a>
                    </div>
                    <div className="navbar-end flex items-center gap-4">
                        <button className="btn btn-sm btn-text btn-circle size-[2.125rem] md:hidden">
                            <span className="icon-[tabler--search] size-[1.375rem]"></span>
                        </button>
                        <label className="input-group max-w-56 rounded-full max-md:hidden">
                            <span className="input-group-text">
                                <span className="icon-[tabler--search] text-base-content/80 size-5"></span>
                            </span>
                            <input type="search" className="input grow rounded-e-full" placeholder="Search" />
                        </label>
                        <div className="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
                            <AvatarButton />
                            <AvatarMenu />
                        </div>
                    </div>
                </nav>
                <div className="bg-base-100 flex w-full items-center">
                    <ul className="menu menu-horizontal gap-2 text-base">
                        <li>
                            <Link
                                to="/"
                                activeProps={{
                                    className: 'font-bold',
                                }}
                                activeOptions={{ exact: true }}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/posts"
                                activeProps={{
                                    className: 'font-bold',
                                }}
                            >
                                Posts (protected)
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard"
                                activeProps={{
                                    className: 'font-bold',
                                }}
                            >
                                Dashboard
                            </Link>
                        </li>
                        {/* <li>
                <Link
                  to="/login"
                  activeProps={{
                    className: 'font-bold',
                  }}
                >
                  Login
                </Link>
              </li> */}
                    </ul>
                </div>

            </Fragment>

            {/* <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/posts"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Posts
          </Link>
          <div className="float-right">
            <div className="ml-auto">
              {user ? (
                <>
                  <span className="mr-2">{user.email}</span>
                  <Link to="/logout">Logout</Link>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
            <div className="ml-auto">
              {!user ? (
                <>
                  <Link to="/signup">Signup</Link>
                </>
              ) : null}
            </div>

          </div>

        </div> */}
         <hr />
        </Fragment>
    )
};

export default Navigation;