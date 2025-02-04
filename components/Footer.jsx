import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8 shadow-lg">
            <div className="container mx-auto flex justify-center items-center space-x-3 text-lg">
                <span>Created with</span>
                <Heart 
                    className="text-red-500 animate-pulse" 
                    fill="currentColor" 
                    size={32} 
                />
                <span className="font-semibold text-green-400 hover:text-green-300 transition">
                    by VivekPant
                </span>
            </div>
        </footer>
    );
};

export default Footer;