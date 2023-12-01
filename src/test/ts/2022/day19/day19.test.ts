import data from "./day19.json";

test("day19", () => {
    console.log(getMaxGeodeAll(24));
});

const recipes: {
    id: number;
    ore: number;
    clay: number;
    obsidianOre: number;
    obsidianClay: number;
    geodeOre: number;
    geodeObsidian: number;
}[] = getInput()
    .split("\n")
    .map((r) => {
        const n = r.split(",").map((n) => Number(n));
        return {
            id: n[0] - 1,
            ore: n[1],
            clay: n[2],
            obsidianOre: n[3],
            obsidianClay: n[4],
            geodeOre: n[5],
            geodeObsidian: n[6]
        };
    });

function getMaxGeodeAll(minLeft: number) {
    let maxGeode = 0;
    for (const recipe of recipes) {
        const geode = getMaxGeode(
            minLeft,
            { ore: 0, clay: 0, obsidian: 0, geode: 0 },
            {
                ore: 1,
                clay: 0,
                obsidian: 0,
                geode: 0
            },
            recipe.id
        );
        maxGeode += (recipe.id + 1) * geode;
        console.log(recipe.id + 1 + ": " + geode);
    }

    return maxGeode;
}

function getMaxGeode(
    minLeft: number,
    mat: { ore: number; clay: number; obsidian: number; geode: number },
    bots: { ore: number; clay: number; obsidian: number; geode: number },
    recipeId: number
): number {
    if (minLeft == 0) return mat.geode;
    const options = getOptions(mat, recipeId);
    if (options.geode)
        return getMaxGeode(
            minLeft - 1,
            {
                ore: mat.ore + bots.ore - recipes[recipeId].geodeOre,
                clay: mat.clay + bots.clay,
                obsidian: mat.obsidian + bots.obsidian - recipes[recipeId].geodeObsidian,
                geode: mat.geode + bots.geode
            },
            { ore: bots.ore, clay: bots.clay, obsidian: bots.obsidian, geode: bots.geode + 1 },
            recipeId
        );
    if (options.obsidian)
        return getMaxGeode(
            minLeft - 1,
            {
                ore: mat.ore + bots.ore - recipes[recipeId].obsidianOre,
                clay: mat.clay + bots.clay - recipes[recipeId].obsidianClay,
                obsidian: mat.obsidian + bots.obsidian,
                geode: mat.geode + bots.geode
            },
            { ore: bots.ore, clay: bots.clay, obsidian: bots.obsidian + 1, geode: bots.geode },
            recipeId
        );

    let geode = getMaxGeode(
        minLeft - 1,
        {
            ore: mat.ore + bots.ore,
            clay: mat.clay + bots.clay,
            obsidian: mat.obsidian + bots.obsidian,
            geode: mat.geode + bots.geode
        },
        { ore: bots.ore, clay: bots.clay, obsidian: bots.obsidian, geode: bots.geode },
        recipeId
    );

    if (minLeft > 17 && options.ore)
        geode = Math.max(
            geode,
            getMaxGeode(
                minLeft - 1,
                {
                    ore: mat.ore + bots.ore - recipes[recipeId].ore,
                    clay: mat.clay + bots.clay,
                    obsidian: mat.obsidian + bots.obsidian,
                    geode: mat.geode + bots.geode
                },
                { ore: bots.ore + 1, clay: bots.clay, obsidian: bots.obsidian, geode: bots.geode },
                recipeId
            )
        );
    if (minLeft > 4 && options.clay)
        geode = Math.max(
            geode,
            getMaxGeode(
                minLeft - 1,
                {
                    ore: mat.ore + bots.ore - recipes[recipeId].clay,
                    clay: mat.clay + bots.clay,
                    obsidian: mat.obsidian + bots.obsidian,
                    geode: mat.geode + bots.geode
                },
                { ore: bots.ore, clay: bots.clay + 1, obsidian: bots.obsidian, geode: bots.geode },
                recipeId
            )
        );

    return geode;
}

function getOptions(
    mat: { ore: number; clay: number; obsidian: number; geode: number },
    recipeId: number
): {
    ore: boolean;
    clay: boolean;
    obsidian: boolean;
    geode: boolean;
} {
    const recipe = recipes[recipeId];
    return {
        ore: mat.ore >= recipe.ore,
        clay: mat.ore >= recipe.clay,
        obsidian: mat.ore >= recipe.obsidianOre && mat.clay >= recipe.obsidianClay,
        geode: mat.ore >= recipe.geodeOre && mat.obsidian >= recipe.geodeObsidian
    };
}

function getInput(): string {
    //return "1,4,2,3,14,2,7";
    return "1,4,2,3,14,2,7\n2,2,3,3,8,3,12";
    return data.data;
}
