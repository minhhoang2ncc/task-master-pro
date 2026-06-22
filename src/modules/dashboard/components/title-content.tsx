import { Tabs, TabsList, TabsTrigger } from "@/shared/components/tabs"
export function TitleContent({name, numTask}: {name: string; numTask: number}) {
    return (
        <>
            <div>
                <h1 className="text-xl font-bold text-foreground">Welcome, {name}</h1>
                <h2 className="text-sm text-muted-foreground">You have {numTask} tasks to complete</h2>
            </div>
            <Tabs defaultValue="all">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="progress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
            </Tabs>
        </>
    )
}