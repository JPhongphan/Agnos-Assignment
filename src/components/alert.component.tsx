export default function AlertComponent({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#00000056]  flex justify-center items-center">
      <div className="bg-white  rounded-md w-[350px] text-center flex flex-col  overflow-hidden">
        <div className="flex flex-col gap-2 p-6">
          <h2 className="text-[20px] font-semibold ">{title}</h2>
          <p className="text-gray-500">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="font-semibold text-blue-500 cursor-pointer px-4 py-2 border-t border-gray-200 hover:bg-gray-100 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
