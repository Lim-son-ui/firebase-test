import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

//-----------------------------------------------------------
// import { Button, Form, Row, Col, FormGroup, Input, CustomInput, Label, InputGroup, InputGroupAddon } from 'reactstrap';
import { Button, Form, Row, Col, FormGroup, Input, CustomInput, Label, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


//-----------------------------------------------------------
import axios from '../api/axios';
const LOGIN_URL = '/auth';

// const Login_old = ( {setRedirect, hasLabel, layout, t} ) => {
    const Login_old = ( ) => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');


    //--------------------------------------------
    const getItemFromStore = (key, defaultValue, store = localStorage) =>
        JSON.parse(store.getItem(key)) || defaultValue;

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(getItemFromStore('email', ''));
    const [inputType, setInputType] = useState('password');
    const [code, setCode] = useState('');

    const toggleVisibility = () => {
        setInputType(inputType === 'password' ? 'text' : 'password');
    };

    //--------------------------------------------

    useEffect(() => {
        // userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            // errRef.current.focus();
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (

        // <section>
        //     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        //     <h1>Sign In</h1>
        //     <form onSubmit={handleSubmit}>
        //         <label htmlFor="username">Username:</label>
        //         <input
        //             type="text"
        //             id="username"
        //             ref={userRef}
        //             autoComplete="off"
        //             onChange={(e) => setUser(e.target.value)}
        //             value={user}
        //             required
        //         />

        //         <label htmlFor="password">Password:</label>
        //         <input
        //             type="password"
        //             id="password"
        //             onChange={(e) => setPwd(e.target.value)}
        //             value={pwd}
        //             required
        //         />
        //         <button>Sign In</button>
        //         <div className="persistCheck">
        //             <input
        //                 type="checkbox"
        //                 id="persist"
        //                 onChange={togglePersist}
        //                 checked={persist}
        //             />
        //             <label htmlFor="persist">Trust This Device</label>
        //         </div>
        //     </form>
        //     <p>
        //         Need an Account?<br />
        //         <span className="line">
        //             <Link to="/register">Sign Up</Link>
        //         </span>
        //     </p>
        // </section>


        <Form onSubmit={handleSubmit}>
            <FormGroup>
                {<Label>{('Email address')}</Label>}
                <Input
                    // placeholder={!hasLabel ? t('Email address') : ''}
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    type="email"
                    autoFocus
                />
            </FormGroup>
            <FormGroup>
                {<Label>{('Password')}</Label>}
                <InputGroup>
                <Input
                    placeholder={('Password')}
                    value={password}
                    maxLength={100}
                    className="password-input"
                    onChange={({ target }) => setPassword(target.value)}
                    type={inputType}
                />
                {/* <InputGroupAddon addonType="append"> */}
                <InputGroupText addonType="append">
                    <Button color="secondary" onClick={toggleVisibility}>
                    {inputType === 'password' ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                </InputGroupText>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Row className="justify-content-between align-items-center">
                <Col xs="6" className="pr-0">
                    {<Label>{('CaptchaCode')}</Label>}
                    <Input
                        placeholder={('CaptchaCode')}
                        value={code}
                        onChange={({ target }) => setCode(target.value)}
                        type="text"
                    />
                </Col>
                <Col xs="6" className="d-flex pr-0 pl-0">
                    {/* <Captcha
                    charNum={4}
                    width={100}
                    height={36}
                    bgColor={!isDark ? themeColors.light : themeColors.dark}
                    onChange={value => setCaptchaCode(value)}
                    ref={captchaRef}
                    /> */}
                </Col>
                </Row>
            </FormGroup>
            <Row className="justify-content-between align-items-center">
                <Col xs="auto">
                {/* <CustomInput
                    id="customCheckRemember"
                    label={t('Remember me')}
                    checked={remember}
                    onChange={({ target }) => setRemember(target.checked)}
                    type="checkbox"
                /> */}
                </Col>
                <Col xs="auto">
                {/* <Link className="fs--1" to={`/authentication/${layout}/sent-forgot-email`}>
                    {t('Forgot Password?')}
                </Link> */}
                </Col>
            </Row>
            <FormGroup>
                {/* <Button color="primary" block className="mt-3" disabled={isDisabled}> */}
                <Button color="primary" block className="mt-3" >
                {('Log in')}
                </Button>
            </FormGroup>
            {/* <CustomInput
                type="select"
                id="language"
                name="language"
                className="mb-3"
                value={language}
                onChange={({ target }) => setLanguage(target.value)}
            >
                <option value="zh_CN">{t('language-zh_CN')}</option>
                <option value="en">{t('language-en')}</option>
                <option value="de">{t('language-de')}</option>
                <option value="fr">{t('language-fr')}</option>
                <option value="es">{t('language-es')}</option>
                <option value="ru">{t('language-ru')}</option>
                <option value="ar">{t('language-ar')}</option>
                <option value="vi">{t('language-vi')}</option>
                <option value="th">{t('language-th')}</option>
                <option value="tr">{t('language-tr')}</option>
                <option value="ms">{t('language-ms')}</option>
                <option value="id">{t('language-id')}</option>
            </CustomInput> */}
            <Row className="justify-content-center align-items-center">
                <Col xs="auto">
                {/* {t('New to MyEMS')}?&nbsp;
                <Link className="fs--1" to={`/authentication/${layout}/sent-register-email`}>
                    {t('Create an account')}
                </Link> */}
                </Col>
            </Row>
        </Form>
    )
}

export default Login_old
