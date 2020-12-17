function Modal(props) {
  return (
    <>
      <div className='fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center'>
        <div className='fixed inset-0 transition-opacity'>
          <div className='absolute inset-0 bg-gray-500 opacity-40'></div>
        </div>

        {props.children}
      </div>
    </>
  );
}

export default Modal;
