import React from 'react';
import { Github } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <div className="logo text-3xl font-extrabold tracking-tight">
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </div>
                <ul className="flex items-center space-x-4">
                    <li>
                        <a 
                            href="https://github.com/yourusername" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 
                                       bg-slate-700 hover:bg-slate-600 
                                       rounded-full px-4 py-2 
                                       transition duration-300 
                                       group"
                        >
                            <Github 
                                className="text-white group-hover:text-green-400 
                                           transition duration-300" 
                                size={24} 
                            />
                            <span className="font-semibold text-sm">GITHUB</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;