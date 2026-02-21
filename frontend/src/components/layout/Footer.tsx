export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-600 font-bold text-xs">SH</span>
            </div>
            <span className="text-gray-900 font-semibold">SereneHub</span>
          </div>
          
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SereneHub. Built on Stacks.
          </div>

          <div className="flex space-x-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="https://github.com/serenehub/serenehub" className="hover:text-gray-900">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
