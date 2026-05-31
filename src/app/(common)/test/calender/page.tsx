import { MeetingScheduler } from "./components/meeting-scheduler";

export default function CalenderPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <MeetingScheduler />
    </div>
  );
}
