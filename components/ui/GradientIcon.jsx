export default function GradientIcon({ children }) {
   return( <>
        <svg className="w-0 h-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="mygradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#AA2A7F" />
                    <stop offset="42.5%" stopColor="#C13874" />
                    <stop offset="100%" stopColor="#BF4040" />
                </linearGradient>
            </defs>
        </svg>
        {children}
    </>)
}