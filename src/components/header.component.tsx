import Image from "next/image";

export default function HeaderComponent({
  title,
  description,
  bgColor,
}: {
  title: string;
  description: string;
  bgColor?: string;
}) {
  return (
    <div
      className={`w-full py-6 px-8 flex flex-col gap-2 rounded-t-[20px] ${bgColor}`}
    >
      <div className="flex gap-2">
        <Image
          src="/assets/icons/icon-person.svg"
          alt="icon-person"
          width={30}
          height={10}
        />
        <h1 className="text-[30px] font-bold text-white">{title}</h1>
      </div>
      <p className="text-white">{description}</p>
    </div>
  );
}
