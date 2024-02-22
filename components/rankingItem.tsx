import React from 'react';
import Image from 'next/image';

interface RankingItemProps {
  rank: number;
  avatarSrc: string;
  name: string;
  points: string;
}

const RankingItem: React.FC<RankingItemProps> = ({ rank, avatarSrc, name, points }) => {
  return (
    <div className='flex justify-between items-center p-2 hover:bg-slate-200'>
      <p>{rank}.</p>
      <div className='flex items-center w-full gap-5 px-5'>
        <div className="w-[50px] h-[50px] relative">
          <Image
            src={avatarSrc}
            fill={true}
            alt="writer profile pic"
            className=""
            style={{ objectFit: "cover" }}
          />
        </div>
        <h1>{name}</h1>
      </div>
      <p>{points}</p>
    </div>
  );
};

export default RankingItem;
