function DonateButton(props) {
  return (
    <div className='bg-gray-50 pt-4'>
      <button
        onClick={props.onClick}
        className={`w-full mx-auto disabled:opacity-50 uppercase flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out`}
        disabled={props.isDisabled}
      >
        Donate Now
      </button>
    </div>
  );
}

export default DonateButton;
