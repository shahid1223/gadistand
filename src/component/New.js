import React from 'react'

const New = () => {
    return (
        <>
            <div className="d-flex justify-content-center login">
                <div class="login-box">
                    <div class="card card-outline card-primary">
                        <div class="card-header text-center">
                            <a href="../../index2.html" class="h1"><b>Login</b></a>
                        </div>
                        <div class="card-body">
                            <p class="login-box-msg">Login in to start your juorney</p>

                            <form action="../../index3.html" method="post">
                                <div class="input-group mb-3">
                                    <input type="email" class="form-control" placeholder="Email" />
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                            <span class="fas fa-envelope"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="password" class="form-control" placeholder="Password" />
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                            <span class="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-8">
                                        <div class="icheck-primary">
                                            <input type="checkbox" id="remember" />
                                            <label for="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>

                                    <div class="col-4">
                                        <button type="submit" class="btn btn-primary btn-block">Log In</button>
                                    </div>
                                </div>
                            </form>
                            <p class="mb-1">
                                <a href="">I forgot my password</a>
                            </p>
                            <p class="mb-0">
                                <a href="" class="text-center">Register a new membership</a>
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default New
