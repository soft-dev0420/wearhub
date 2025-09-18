"use client";
import React from "react";
import Logo from "../header/logo/Logo";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
	const { messages } = useLang();
	const footerAnimation = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1,
			},
		},
	};

	const itemAnimation = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5 },
		},
	};

	return (
		<footer className="bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 text-white pt-16 pb-8 border-t border-slate-800">
			<div className="container mx-auto px-4">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={footerAnimation}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
				>
					{/* Company Info */}
					<motion.div variants={itemAnimation} className="space-y-6">
						<Logo />
						<p className="text-slate-300 leading-relaxed">
							{messages["footerContent"]}
						</p>
						{/* Social links can be enabled later with blue accents */}
					</motion.div>

					{/* Quick Links */}
					<motion.div variants={itemAnimation} className="space-y-6">
						<h3 className="text-lg font-semibold text-blue-400">
							{messages["quicklinksTitle"]}
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="/"
									className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center"
								>
									<span className="bg-slate-800 p-1 rounded-full mr-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-3 w-3 text-blue-400"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</span>
									{messages["homeTitle"]}
								</Link>
							</li>
							<li>
								<Link
									href="/about-us"
									className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center"
								>
									<span className="bg-slate-800 p-1 rounded-full mr-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-3 w-3 text-blue-400"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</span>
									{messages["aboutusTitle"]}
								</Link>
							</li>
							<li>
								<Link
									href="/contact-us"
									className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center"
								>
									<span className="bg-slate-800 p-1 rounded-full mr-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-3 w-3 text-blue-400"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</span>
									{messages["contactusTitle"]}
								</Link>
							</li>
							<li>
								<Link
									href="/services"
									className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center"
								>
									<span className="bg-slate-800 p-1 rounded-full mr-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-3 w-3 text-blue-400"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</span>
									{messages["termsofuseTitle"]}
								</Link>
							</li>
						</ul>
					</motion.div>

					{/* Services */}
					<motion.div variants={itemAnimation} className="space-y-6">
						<h3 className="text-lg font-semibold text-blue-400">
							{messages["ourservicesTitle"]}
						</h3>
						<ul className="space-y-3">
							<li>
								<div className="text-slate-300 hover:text-blue-400 transition-colors duration-300">
									{messages["carehomesTitle"]}
								</div>
							</li>
							<li>
								<div className="text-slate-300 hover:text-blue-400 transition-colors duration-300">
									{messages["caregiversTitle"]}
								</div>
							</li>
							<li>
								<div className="text-slate-300 hover:text-blue-400 transition-colors duration-300">
									{messages["nursesTitle"]}
								</div>
							</li>
							<li>
								<div className="text-slate-300 hover:text-blue-400 transition-colors duration-300">
									{messages["seniorstoresTitle"]}
								</div>
							</li>
							<li>
								<div className="text-slate-300 hover:text-blue-400 transition-colors duration-300">
									{messages["transportTitle"]}
								</div>
							</li>
						</ul>
					</motion.div>
				</motion.div>

				{/* Copyright */}
				<motion.div
					variants={itemAnimation}
					initial="hidden"
					animate="visible"
					className="mt-12 text-center"
				>
					<p className="text-slate-400 text-sm">
						© {currentYear} WearHub. {messages["copyContent"]}
					</p>
				</motion.div>
			</div>
		</footer>
	);
};

export default Footer;
