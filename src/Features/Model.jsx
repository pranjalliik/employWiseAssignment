function Model({ children ,modelState }) {
    return (
      <>
        <div className="border rounded-lg w-10/12 ml-2 mr-2 md:w-1/2 lg:w-1/3 " style={{ position: 'fixed' , top: '50%', left: '50%',  transform: 'translate(-50%, -50%)', zIndex: '4',  backdropFilter: 'blur(4px)' , backgroundColor : '#ffffff'}} >
      <div className="flex justify-end  cursor-default text-white bg-[#003032] pt-3 "  onClick={() => modelState(false)}>
      <i className="fa-solid fa-xmark text-xl mr-3"></i>

</div>

            {children}</div>
      </>
    );
  }
  
  export { Model };