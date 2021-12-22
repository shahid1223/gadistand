import React from 'react'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    let navigate = useNavigate("");
    const auth = localStorage.getItem('token')
    const logout = () => {
        localStorage.removeItem('token')
        navigate('/')
        console.log("logout")
    }
    return (
        <>
            <nav class="main-header navbar navbar-expand navbar-white navbar-light" style={{ marginLeft: 0 }}>

                <ul class="navbar-nav">
                    <li class="nav-item">
                        <span class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></span >
                    </li>
                    <li class="nav-item d-none d-sm-inline-block">
                        <span href="../../index3.html" class="nav-link">Home</span >
                    </li>
                    <li class="nav-item d-none d-sm-inline-block">
                        <span href="#" class="nav-link">Contact</span >
                    </li>
                </ul>

                <form class="form-inline ml-3">
                    <div class="input-group input-group-sm">
                        <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                        <div class="input-group-append">
                            <button class="btn btn-navbar" type="submit">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
                <ul class="navbar-nav ml-auto">

                    <li class="nav-item dropdown">

                        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">

                            <div class="dropdown-divider"></div>
                            <span href="#" class="dropdown-item">

                                <div class="media">
                                    <img src="../../dist/img/user8-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3" />
                                    <div class="media-body">
                                        <h3 class="dropdown-item-title">
                                            John Pierce
                                            <span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>
                                        </h3>
                                        <p class="text-sm">I got your message bro</p>
                                        <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                    </div>
                                </div>

                            </span >
                            <div class="dropdown-divider"></div>
                            <span href="#" class="dropdown-item">

                                <div class="media">
                                    <img src="../../dist/img/user3-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3" />
                                    <div class="media-body">
                                        <h3 class="dropdown-item-title">
                                            Norspan Silvester
                                            <span class="float-right text-sm text-warning"><i class="fas fa-star"></i></span>
                                        </h3>
                                        <p class="text-sm">The subject goes here</p>
                                        <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                    </div>
                                </div>

                            </span >
                            <div class="dropdown-divider"></div>
                            <span href="#" class="dropdown-item dropdown-footer">See All Messages</span >
                        </div>
                    </li>

                    <li class="nav-item dropdown">
                        <span class="nav-link" data-toggle="dropdown" href="#">
                            <i class="far fa-bell"></i>
                            <span class="badge badge-warning navbar-badge">15</span>
                        </span >
                        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span class="dropdown-item dropdown-header">15 Notifications</span>
                            <div class="dropdown-divider"></div>
                            <span href="#" class="dropdown-item">
                                <i class="fas fa-envelope mr-2"></i> 4 new messages
                                <span class="float-right text-muted text-sm">3 mins</span>
                            </span >
                            <div class="dropdown-divider"></div>
                            <span href="#" class="dropdown-item">
                                <i class="fas fa-users mr-2"></i> 8 friend requests
                                <span class="float-right text-muted text-sm">12 hours</span>
                            </span >
                            <div class="dropdown-divider"></div>
                            <span href="#" class="dropdown-item">
                                <i class="fas fa-file mr-2"></i> 3 new reports
                                <span class="float-right text-muted text-sm">2 days</span>
                            </span >
                            <div class="dropdown-divider"></div>
                            <span href="#" class="dropdown-item dropdown-footer">See All Notifications</span >
                        </div>
                    </li>
                    <li class="nav-item">
                        <span class="nav-link" data-widget="fullscreen" href="#" role="button">
                            <i class="fas fa-expand-arrows-alt"></i>
                        </span >
                    </li>
                    <li class="nav-item" onClick={logout}>
                        <span class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                            <i  class="fas fa-th-large"></i>
                        </span >
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Sidebar
