"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { judgeDish } from "@/actions/judge-dish";
import { judgeDishWithSettings } from "@/actions/judge-dish-with-settings";

interface JudgeResult {
  rank: string
  totalScore: number
  scores: {
    flavorSynergy: number
    technique: number
    creativity: number
    presentation: number
    bonusModifier: number
  }
  judgeComment: string
  visualDescription: string
}

export default function FantasyKitchenJudge() {
  const [dishDescription, setDishDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<JudgeResult | null>(null)
  const [settingsText, setSettingsText] = useState("")

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "S+":
        return "bg-gradient-to-r from-yellow-400 to-amber-500 text-white"
      case "S":
        return "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
      case "A":
        return "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
      case "B":
        return "bg-gradient-to-r from-blue-400 to-cyan-500 text-white"
      case "C":
        return "bg-gradient-to-r from-purple-400 to-violet-500 text-white"
      case "D":
        return "bg-gradient-to-r from-gray-400 to-slate-500 text-white"
      case "F":
        return "bg-gradient-to-r from-red-400 to-rose-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text()
    setSettingsText(text)
  }

  const handleJudgeDish = async () => {
    if (!dishDescription.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const data = await judgeDishWithSettings({ description: dishDescription, settings: settingsText });
      setResult({
        rank: data.overall_rank,
        totalScore: data.total_score,
        scores: {
          flavorSynergy: data.flavor_synergy,
          technique: data.technique,
          creativity: data.creativity_and_restraint,
          presentation: data.presentation,
          bonusModifier: data.bonus_modifier,
        },
        judgeComment: data.comment,
        visualDescription: data.visual_description,
      });
    } catch (error) {
      console.error("Judging failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-800 mb-2 tracking-wide">
            Fantasy Kitchen Judge
          </h1>
          <p className="text-lg text-slate-600 font-light">Submit your dish and get ranked by the culinary council</p>
        </div>

        {/* Main Form Card */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-slate-700 text-center">Present Your Creation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Optional Settings File Upload */}
            <div className="space-y-2">
              <Label htmlFor="settings-file" className="text-slate-700 font-medium">
                Optional Settings File
              </Label>
              <input
                id="settings-file"
                type="file"
                accept=".txt,.json"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setSettingsText(reader.result as string); // add this to state
                    };
                    reader.readAsText(file);
                  } else {
                    setSettingsText('');
                  }
                }}
                className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
              />
              <p className="text-xs text-slate-500">Upload a .txt or .json file with custom judging settings (optional)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dish-description" className="text-slate-700 font-medium">
                Describe Your Dish
              </Label>
              <Textarea
                id="dish-description"
                placeholder="Tell us about your culinary masterpiece... What ingredients did you use? How did you prepare it? What makes it special?"
                value={dishDescription}
                onChange={(e) => setDishDescription(e.target.value)}
                className="min-h-32 resize-none border-slate-200 focus:border-amber-400 focus:ring-amber-400"
              />
            </div>
            <Button
              onClick={handleJudgeDish}
              disabled={!dishDescription.trim() || isLoading}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-3 text-lg rounded-lg shadow-md transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  The Council Deliberates...
                </>
              ) : (
                "Judge My Dish"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Panel */}
        {result && (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Rank Badge and Score */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-6">
                  <Badge className={`text-4xl font-bold px-6 py-3 rounded-xl shadow-lg ${getRankColor(result.rank)}`}>
                    {result.rank}
                  </Badge>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-800">{result.totalScore}</div>
                    <div className="text-slate-600">Total Score</div>
                  </div>
                </div>
              </div>

              {/* Scoring Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-slate-800">{result.scores.flavorSynergy}</div>
                  <div className="text-slate-600 text-sm">Flavor Synergy</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-slate-800">{result.scores.technique}</div>
                  <div className="text-slate-600 text-sm">Technique</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-slate-800">{result.scores.creativity}</div>
                  <div className="text-slate-600 text-sm">Creativity & Restraint</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-slate-800">{result.scores.presentation}</div>
                  <div className="text-slate-600 text-sm">Presentation</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 text-center md:col-span-2 lg:col-span-1">
                  <div
                    className={`text-2xl font-bold ${result.scores.bonusModifier >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {result.scores.bonusModifier >= 0 ? "+" : ""}
                    {result.scores.bonusModifier}
                  </div>
                  <div className="text-slate-600 text-sm">Bonus Modifier</div>
                </div>
              </div>

              {/* Judge's Comment */}
              <blockquote className="border-l-4 border-amber-400 bg-amber-50 p-6 rounded-r-lg mb-6">
                <div className="text-slate-700 font-medium mb-2">Judge's Verdict:</div>
                <p className="text-slate-800 leading-relaxed italic">"{result.judgeComment}"</p>
              </blockquote>

              {/* Visual Description */}
              <div className="text-center">
                <p className="text-slate-500 italic text-sm leading-relaxed max-w-2xl mx-auto">
                  {result.visualDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
