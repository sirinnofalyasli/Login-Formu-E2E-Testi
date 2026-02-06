import { useState } from "react";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [success, setSuccess] = useState("")
    const [error, setError] = useState([])

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    const validasyon = (email, password) => {
        const newErrors = [];

        if (!email) newErrors.push("Email alanı boş bırakılamaz.");
        else if (!emailRegex.test(email)) newErrors.push("Geçerli bir email adresi giriniz.");

        if (!password) newErrors.push("Şifre alanı boş bırakılamaz.");
        else if (!passwordRegex.test(password)) newErrors.push("Lütfen güçlü bir şifre giriniz.");
        return newErrors;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = validasyon(email, password);

        if (!termsAccepted) newErrors.push("Şartları kabul ediniz.")

        if (newErrors.length > 0) {
            setError(newErrors);
            setSuccess("");
            return;
        } else {
            setError([]);
            setSuccess("Giriş Başarılı!");
        }
    }

    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="text"
                    placeholder="Your Email"
                    value={email}
                    data-cy="email"
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setError(validasyon(event.target.value, password));
                    }}


                />

                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    data-cy="password"
                    onChange={(event) => {
                        setPassword(event.target.value);
                        setError(validasyon(email, event.target.value));
                    }}

                />

                <label htmlFor="terms">
                    <input
                        required
                        type="checkbox"
                        id="terms"
                        onChange={(event) => setTermsAccepted(event.target.checked)}
                        checked={termsAccepted}
                        data-cy="terms"
                    />
                    Şartları kabul ediyorum.

                </label>
                <button
                    type="submit" data-cy="submit"
                    disabled={!termsAccepted || !email || !password || !emailRegex.test(email) || !passwordRegex.test(password)}>
                    Giriş
                </button>


                {error.map((error, index) => (
                    <p key={index} data-cy="error">{error}</p>
                ))}
                {success && <p data-cy="success">{success}</p>}
            </form >
        </>
    )
}

