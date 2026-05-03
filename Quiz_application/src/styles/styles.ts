export const styles : Record<string, string> = {
    background: 'flex flex-col items-center bg-linear-to-b from-purple-800 via-purple-900 to-red-950 w-screen h-screen fixed inset-0 overflow-auto',
    headerTitle: 'text-xl font-bold bg-linear-to-b from-purple-200 to-pink-600 bg-clip-text text-transparent',
    customButton: 'bg-gray-300 hover:bg-gray-400 hover:text-purple-600 text-purple-800 text-2xl font-bold rounded my-2 w-1/4 h-1/8 min-w-36 min-h-10 justify-self-center',
    footerText: 'text-red-900 text-shadow-xs',
    customText: 'text-lg text-gray-300 py-2 ',
    modalFrame: 'flex flex-col items-center justify-center fixed inset-0 bg-black/50 ',
    modalContent: 'flex flex-col items-center bg-linear-to-b from-purple-800 to-purple-900 rounded-lg shadow-lg w-1/3 max-w-[600px] min-w-[300px] h-5/6 max-h-[90vh] min-h-[300px] overflow-auto',
    closeButton: 'bg-gray-300 hover:bg-red-200 hover:text-red-800 text-purple-800 text-2xl font-bold rounded w-1/4 min-w-36 min-h-10 items-center justify-self-center my-5',
    answerButton: 'hover:bg-gray-400 hover:text-purple-600 text-purple-800 text-2xl font-bold rounded my-2 w-1/4 h-1/8 min-w-116 min-h-26 justify-self-center mx-4 my-4',
    disabledButton: 'bg-red-800 text-white text-2xl font-bold rounded my-2 w-1/4 h-1/8 min-w-36 min-h-10 justify-self-center',
}
export default styles;