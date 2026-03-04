export default function ActionStatusCard({ status }: { status?: string }) {
  const mapStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#F2F8FF]  border-[#47a0ff] text-[#47a0ff]";
      case "inactive":
        return "bg-[#FFE5E5] border-[#ff6363] text-[#ff6363]";
      case "saved":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const mapStatusMessage = (status: string) => {
    switch (status) {
      case "active":
        return "Patient is actively filling out the form";
      case "inactive":
        return "Patient has stopped filling out the form";
      case "saved":
        return "Patient has saved the form";
      default:
        return "Patient is not filling out the form";
    }
  };

  return status ? (
    <div className="w-full bg-white shadow-md pt-8 px-8">
      <div className={"w-full p-4 rounded-lg border " + mapStatusColor(status)}>
        <span className="text-sm font-medium">{mapStatusMessage(status)}</span>
      </div>
    </div>
  ) : null;
}
