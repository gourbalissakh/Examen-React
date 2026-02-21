/**
 * StatCard - Carte de statistique dark blue theme
 */

const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => {
    const colorStyles = {
        blue: {
            bg: 'bg-blue-500/20',
            text: 'text-blue-400',
            border: 'border-blue-500/30',
        },
        cyan: {
            bg: 'bg-cyan-500/20',
            text: 'text-cyan-400',
            border: 'border-cyan-500/30',
        },
        green: {
            bg: 'bg-emerald-500/20',
            text: 'text-emerald-400',
            border: 'border-emerald-500/30',
        },
        orange: {
            bg: 'bg-orange-500/20',
            text: 'text-orange-400',
            border: 'border-orange-500/30',
        },
        red: {
            bg: 'bg-red-500/20',
            text: 'text-red-400',
            border: 'border-red-500/30',
        },
        purple: {
            bg: 'bg-purple-500/20',
            text: 'text-purple-400',
            border: 'border-purple-500/30',
        },
        zinc: {
            bg: 'bg-slate-500/20',
            text: 'text-slate-400',
            border: 'border-slate-500/30',
        },
        emerald: {
            bg: 'bg-emerald-500/20',
            text: 'text-emerald-400',
            border: 'border-emerald-500/30',
        },
        violet: {
            bg: 'bg-violet-500/20',
            text: 'text-violet-400',
            border: 'border-violet-500/30',
        },
    }

    const style = colorStyles[color] || colorStyles.blue

    return (
        <div
            className={`card hover:border-slate-600 transition-all ${style.border}`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-400 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-white">{value}</p>
                </div>
                <div
                    className={`w-12 h-12 rounded-xl ${style.bg} flex items-center justify-center`}
                >
                    {Icon && <Icon className={`w-6 h-6 ${style.text}`} />}
                </div>
            </div>
        </div>
    )
}

export default StatCard
