import React from "react";

const About = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12 px-6">
            <h1 className="text-4xl font-bold text-blue-400 mb-6">About ScaleUp</h1>
            
            <div className="max-w-4xl text-center text-gray-300">
                <p className="text-lg mb-6">
                    ScaleUp was founded with a vision to revolutionize fundraising by eliminating intermediaries
                    and making investments transparent, secure, and accessible to everyone. By leveraging the power
                    of blockchain, we are transforming how startups connect with investors.
                </p>
            </div>
            
            <div className="max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg text-center mt-8">
                <h2 className="text-2xl font-semibold text-green-400">Meet Our Founder</h2>
                <img src="/images/founder.jpg" alt="Founder" className="w-32 h-32 mx-auto rounded-full my-4"/>
                <h3 className="text-xl font-semibold">Yogi</h3>
                <p className="text-gray-300 mt-2">
                    Yogi, a blockchain enthusiast and serial entrepreneur, was inspired to change the way
                    funding works after witnessing inefficiencies in traditional fundraising methods. His vision is to
                    create a decentralized, trustless platform where innovation thrives without barriers.
                </p>
            </div>
            
            <div className="max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg text-center mt-8">
                <h2 className="text-2xl font-semibold text-yellow-400">What People Say</h2>
                <div className="mt-4">
                    <p className="text-gray-300 italic">"ScaleUp has transformed how we raise capital. The process is seamless and secure."</p>
                    <p className="text-gray-400 mt-2">- Jane Smith, Startup Founder</p>
                </div>
                <div className="mt-4">
                    <p className="text-gray-300 italic">"Investing in startups has never been this easy. Blockchain makes everything transparent."</p>
                    <p className="text-gray-400 mt-2">- Mark Wilson, Investor</p>
                </div>
            </div>
        </div>
    );
};

export default About;
