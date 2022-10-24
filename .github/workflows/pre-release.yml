name: Pre Release

on:
  pull_request:
    types:
      - closed
    branches:
      - alpha
      - beta
      - release
    paths:
      - "src/components/**"
      - "src/internal/**"
      - "src/utilities/**"

jobs:
  publish-npm:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 14
      - name: Cache dependencies
        id: cache
        uses: actions/cache@v2
        with:
          path: ./node_modules
          key: modules-${{ hashFiles('package-lock.json') }}
      - name: Install dependencies
        if: steps.cache.outputs.cache-hit != 'true'
        run: npm i --ignore-scripts --legacy-peer-deps
      - name: Run post install scripts
        run: npm rebuild
      - name: Create alpha release
        if: ${{github.ref == 'alpha' }}
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          npx lerna version --conventional-commits --conventional-prerelease --preid alpha --no-private --no-changelog --force-publish --exact --yes
      - name: Create beta release
        if: ${{github.ref == 'beta' }}
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          npx lerna version --conventional-commits --conventional-prerelease --preid beta --no-private --no-changelog --force-publish --exact --yes
      - name: Create rc release
        if: ${{github.ref == 'release' }}
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          npx lerna version --conventional-commits --conventional-prerelease --preid rc --no-private --no-changelog --force-publish --exact --yes


      # Create PR on alpha release

      - name: Check if alpha merge PR already exists
        id: "check-if-alpha-pr-already-exists"
        if: ${{github.ref == 'alpha' }}
        uses: fjenik/check-if-pr-exists@0.0.3
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          target-branch: beta
          source-branch: alpha    

      - name: Create pull request
        if: ${{ steps.check-if-alpha-pr-already-exists.outputs.is-pr-already-created == 'false' && github.ref == 'alpha'  }}
        uses: fjenik/create-pull-request@0.0.12
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          target-branch: beta
          source-branch: alpha
          pr-body: |
            _This PR was generated via github actions workflow to prepare the merge from alpha to beta_
          pr-title: "chore(release): Merge alpha into beta."

      # Create PR on beta release

      - name: Check if beta merge PR already exists
        id: "check-if-beta-pr-already-exists"
        if: ${{github.ref == 'beta' }}
        uses: fjenik/check-if-pr-exists@0.0.3
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          target-branch: release
          source-branch: beta    

      - name: Create pull request
        if: ${{ steps.check-if-beta-pr-already-exists.outputs.is-pr-already-created == 'false' && github.ref == 'beta'  }}
        uses: fjenik/create-pull-request@0.0.12
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          target-branch: release
          source-branch: beta
          pr-body: |
            _This PR was generated via github actions workflow to prepare the merge from beta to release_
          pr-title: "chore(release): Merge beta into release."

      # Create PR on rc release

      - name: Check if rc merge PR already exists
        id: "check-if-rc-pr-already-exists"
        if: ${{github.ref == 'release' }}
        uses: fjenik/check-if-pr-exists@0.0.3
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          target-branch: main
          source-branch: release    

      - name: Create pull request
        if: ${{ steps.check-if-rc-pr-already-exists.outputs.is-pr-already-created == 'false' && github.ref == 'release'  }}
        uses: fjenik/create-pull-request@0.0.12
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          target-branch: main
          source-branch: release
          pr-body: |
            _This PR was generated via github actions workflow to prepare the merge from release to main_
          pr-title: "chore(release): Merge release into main."