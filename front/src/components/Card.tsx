"use client";
import React, { useState } from 'react';

interface CardProps {
  title: string;
  description: string;
  tags: string[];
}

const Card: React.FC<CardProps> = ({ title, description, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const renderModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="font-bold text-xl mb-4">{title}</h2>
          <p className="text-gray-700">{description}</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleModal}>
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <article
        className="max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer"
        onClick={toggleModal}
      >
        <div className="px-6 py-4">
          <header>
            <h2 className="font-bold text-xl mb-2">{title}</h2>
          </header>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <footer className="px-6 py-4">
          <ul className="flex flex-wrap">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                #{tag}
              </li>
            ))}
          </ul>
        </footer>
      </article>

      {renderModal()}
    </div>
  );
};

export default Card;
