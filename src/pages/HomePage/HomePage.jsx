import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page">
            <h1>Welcome to Petlove! 🐾</h1>
            <p>Find your new best friend today!</p>

            <div className='hero-image'>
                {/* Здесь будет картинка */}
                <div className="image-placeholder">
                    🐕 Image will be here 🐈
                </div>
            </div>

            <div className="features"> 
                <h2>Why choose Petlove?</h2>
                <ul>
                    <li>✅ Thousands of pets waiting for home</li>
                    <li>✅ Verified shelters and owners</li>
                    <li>✅ Easy adoption process</li>
                </ul>
            </div>
        </div>
    );
}


export default HomePage;