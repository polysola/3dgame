import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage, score, user }) => {
  if (currentStage === 1)
    return (
      <div className='info-box'>
        {user ? (
          <div className='flex flex-col items-center'>
            {user.photoUrl && (
              <img
                src={user.photoUrl}
                alt={user.firstName}
                className='w-16 h-16 rounded-full mb-2'
              />
            )}
            <p className='font-medium text-center sm:text-xl'>
              Hi, {user.firstName} 👋
            </p>
          </div>
        ) : (
          <p className='font-medium text-center sm:text-xl'>
            Hi, I'm PhoeniXRP 👋
          </p>
        )}
        <div className='mt-4 bg-white/90 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all'>
          <p className='text-center'>
            <span className='text-blue-600 font-bold'>Your Score:</span>
            <br />
            <span className='text-4xl font-black text-blue-500 score-animation'>
              {score}
            </span>
          </p>
          <p className='text-sm text-gray-600 text-center mt-2'>
            Click the plane to increase your score!
          </p>
        </div>
      </div>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Worked with many companies <br /> and picked up many skills along the way
        </p>

        <Link to='/about' className='neo-brutalism-white neo-btn'>
          Learn more
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          Led multiple projects to success over the years. <br /> Curious about the impact?
        </p>

        <Link to='/projects' className='neo-brutalism-white neo-btn'>
          Visit my portfolio
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Buy PhoeniXrp now!
        </p>

        <Link to='https://firstledger.net/token/rDNR4pFFn3PYkNG3e1hm48Xy37yfJrvdcf/5058525000000000000000000000000000000000' className='neo-brutalism-white neo-btn'>
          Buy
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  return null;
};

export default HomeInfo;
