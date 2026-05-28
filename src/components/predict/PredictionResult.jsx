import { Activity } from "lucide-react";

export default function PredictionResult({ predictionResult }) {
    return (
        <div className="mx-auto w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 rounded-3xl bg-card border border-borderPrimary shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-textPrimary">Hasil Analisis</h3>
                        <p className="text-sm text-textSecondary">Berikut adalah hasil analisis nutrisi makanan</p>
                    </div>
                </div>

                {predictionResult.data ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(predictionResult.data).map(([key, val]) => (
                                <div key={key} className="p-4 bg-surface2 rounded-2xl border border-borderPrimary">
                                    <p className="text-xs text-textMuted uppercase tracking-wider mb-1 font-semibold">{key}</p>
                                    <p className="text-lg font-bold text-textPrimary">{typeof val === 'number' ? val.toFixed(1) : String(val)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <pre className="bg-surface2 p-6 rounded-2xl border border-borderPrimary overflow-auto text-sm text-textPrimary">
                        {JSON.stringify(predictionResult, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    )
}